window.addEventListener('load', () => {

	console.log("Loaded");

	const dancers = document.querySelectorAll('[animation]');

	const dur = 1000;

	const start = new Event('start');
	const pause = new Event('pause');
	const resume = new Event('resume');

	const scale = 0.02;
	const dist = 5;
	const deg = 5;

	for (let dancer of dancers){
		// dancer.setAttribute('animation__fade', `dur: ${dur}; pauseEvents: pause; resumeEvents: resume; startEvents: start;`);
		let obj = dancer.object3D;
		let pos = {x:Math.random()*dist,y:0,z:Math.random()*dist};
		let rot = {x:0,y:0,z:0};
		obj.position.set(pos.x,pos.y,pos.z);
		obj.rotation.set(rot.x,rot.y,rot.z);
		obj.scale.x = obj.scale.y = obj.scale.z = scale;
		obj.castShadow = obj.receiveShadow = true;

		// dancer.components['fbx-model'].model.children[0].material.transparent = true;
		// dancer.components['fbx-model'].model.children[0].material.needsUpdate = true;

		console.log(dancer.object3D);
		// console.log(dancer.object3D.children[0].children[0].material.opacity);

		// dancer.components['fbx-model'].model.children[0].material.opacity = 0.5;

		// obj.traverse((o) => {
		// 	if (o.isMesh && o.material.opacity) {
		// 		o.material.opacity = 0.5;
		// 		o.material.transparent = true;
		// 		o.material.needsUpdate = true;
		// 	}
		// });
		// setInterval(()=>{
			// dancer.dispatchEvent(start);
		// },Math.random()*10000);

	}

});
