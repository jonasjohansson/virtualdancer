AFRAME.registerComponent('dancer', {

	schema: {
		life: {default: 5000},
		fade: {default: 2000},
		intensity: {default: 0.5}
	},

	init() {
		const data = this.data;
		const delay = Math.random() * 10000;

		const self = this;

		this.visibility = 0;

		this.el.addEventListener('model-loaded', () => {
			let model = this.el.components['gltf-model'].model.children[0].children[0];
			let modelMaterial = model.material;

			modelMaterial.opacity = modelMaterial.visible = 0;
			modelMaterial.transparent = true;
			modelMaterial.needsUpdate = true;

			self.el.setAttribute('animation-mixer', 'clip: *;');
			// Self.el.components['animation-mixer'].mixer.timeScale = 0;

			this.el.components.sound.stopSound();
			this.el.components.sound.playSound();

			this.modelMaterial = modelMaterial;

			this.update();
		});


	},

	update() {

		const dist = 90;
		const deg = 90;

		const pos = {
			x: getRand(dist),
			y: 0,
			z: getRand(dist)
		};

		const rot = {
			x: 0,
			y: getRand(deg),
			z: 0
		};

		this.el.object3D.position.set(pos.x, pos.y, pos.z);
		this.el.object3D.rotation.set(rot.x, rot.y, rot.z);
		// This.el.setAttribute('particles', `origin: ${pos.x} ${pos.y} ${pos.z};`);
	},

	tick() {
		if (!this.modelMaterial) {
			return;
		}

		const sceneIntensity = this.el.sceneEl.components.drama.intensity;
		const intensityDistance = Math.abs(sceneIntensity - this.data.intensity);
		const visibility = intensityDistance < 0.3 ?
			(0.3 - intensityDistance) / 0.3 :
			0;

		if (visibility === 0 && this.visibility > 0) {
			this.update();
		}

		this.visibility = visibility;

		this.modelMaterial.visible = this.visibility !== 0;

		// console.log(sceneIntensity, this.data.intensity, this.visibility)
		this.el.components.sound.pool.children[0].gain.gain.value = this.visibility;
		this.modelMaterial.opacity = this.visibility;
	}
});

const getRand = val => {
	return Math.random(val) * Math.random() < 0.5 ? -1 : 1;
};
