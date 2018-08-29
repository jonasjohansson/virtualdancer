AFRAME.registerComponent('dancer', {

	schema: {
		src: {default: ''},
		life: {default: 5000},
		fade: {default: 2000},
		intensity: {default: 0.5},
	},

	init() {

		const data = this.data;

		var self = this;

		this.mat = null;

		const delay = Math.random()*10000;
		const scale = 0.02;

		this.visibility = 0

		// wait for fbx to be loaded
		this.el.addEventListener('model-loaded', ()=>{
			// console.log(this.el.components['fbx-model'].model);
			self.mat = this.el.components['fbx-model'].model.children[0].material;

			self.mat.transparent = true;
			self.mat.wireframe = true;
			self.mat.opacity = 0;
			self.mat.needsUpdate = true;
			self.el.object3D.scale.set(scale,scale,scale);
			this.update();
			// self.el.setAttribute('animation',`property: opacity; from: 0; to: 1; dur: ${data.fade}; autoplay: true; delay: ${delay};`);
			self.el.setAttribute('animation-mixer','clip: *;');
			self.el.components['animation-mixer'].mixer.timeScale = 0;
			setTimeout(()=>{
				// self.el.components['animation-mixer'].mixer.timeScale = Math.random()*2;
				self.el.components['animation-mixer'].mixer.timeScale = 1;
			},delay);

			// stopSound() is necessary for iOS to properly play it
			this.el.components.sound.stopSound();
			this.el.components.sound.playSound();
		});

		this.el.setAttribute('fbx-model',`src: url(${data.src});`);

		// const start = new Event('start');

		// let dir = null;

		// this.el.addEventListener('animationbegin', ()=>{
		// 	if (dir === 'normal') self.update();
		// });

		// this.el.addEventListener('animationcomplete', ()=>{
		// 	setTimeout(()=>{
		// 		dir = (dir === 'reverse') ? 'normal' : 'reverse';
		// 		self.el.setAttribute('animation', `dir: ${dir};`);
		// 		self.el.dispatchEvent(start);
		// 	},data.life);
		// });

		setInterval(()=>{
			let dancers = document.querySelectorAll['fbx']
		},Math.random()*10000);

	},

	update() {

		// console.log('update position');

		const dist = 40;
		const deg = 90;

		let pos = {x:(dist/2)-Math.random()*dist,y:0,z:(dist/2)-Math.random()*dist};
		let rot = {x:0,y:(deg/2)-Math.random()*deg,z:0};

		this.el.object3D.position.set(pos.x,pos.y,pos.z);
		this.el.object3D.rotation.set(rot.x,rot.y,rot.z);
		// this.el.setAttribute('particles',`origin: ${pos.x} ${pos.y} ${pos.z};`);
	},

	tick() {
		if (this.mat === null) return;

		const sceneIntensity = this.el.sceneEl.components.drama.intensity
		const intensityDistance = Math.abs(sceneIntensity - this.data.intensity)
		const visibility = intensityDistance < 0.3
			? (0.3 - intensityDistance) / 0.3
			: 0

		if (visibility === 0 && this.visibility > 0) {
			this.update()
		}

		this.visibility = visibility

		if (this.visibility === 0){
			this.mat.visible = false;
		} else {
			this.mat.visible = true;
		}

		this.el.components.sound.pool.children[0].gain.gain.value = this.visibility;
		this.mat.opacity = this.visibility;

	}
});
