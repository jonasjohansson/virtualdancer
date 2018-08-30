AFRAME.registerComponent('ocean', {

	init() {
		const scene = this.el.sceneEl.object3D;

		const test = this.el.sceneEl;

		const waterGeometry = new THREE.PlaneBufferGeometry(10000, 10000);

		light = new THREE.DirectionalLight(0xFFFFFF, 0.8);
		scene.add(light);

		water = new THREE.Water(
			waterGeometry,
			{
				textureWidth: 512,
				textureHeight: 512,
				waterNormals: new THREE.TextureLoader().load('./assets/textures/waternormals.jpg', texture => {
					texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
				}),
				alpha: 1.0,
				sunDirection: light.position.clone().normalize(),
				sunColor: 0xFFFFFF,
				waterColor: 0x001E0F,
				distortionScale: 3.7,
				fog: scene.fog !== undefined
			}
		);

		water.rotation.x = -Math.PI / 2;

		scene.add(water);

		const sky = new THREE.Sky();
		sky.scale.setScalar(10000);
		// Scene.add( sky );

		const uniforms = sky.material.uniforms;

		uniforms.turbidity.value = 10;
		uniforms.rayleigh.value = 2;
		uniforms.luminance.value = 1;
		uniforms.mieCoefficient.value = 0.005;
		uniforms.mieDirectionalG.value = 0.8;

		const parameters = {
			distance: 400,
			inclination: 2.49,
			azimuth: 0.205
		};

		const cubeCamera = new THREE.CubeCamera(1, 20000, 256);
		cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;

		function updateSun() {
			const theta = Math.PI * (parameters.inclination - 0.5);
			const phi = 2 * Math.PI * (parameters.azimuth - 0.5);

			light.position.x = parameters.distance * Math.cos(phi);
			light.position.y = parameters.distance * Math.sin(phi) * Math.sin(theta);
			light.position.z = parameters.distance * Math.sin(phi) * Math.cos(theta);

			sky.material.uniforms.sunPosition.value = light.position.copy(light.position);
			water.material.uniforms.sunDirection.value.copy(light.position).normalize();

			cubeCamera.update(test.renderer, scene);
		}

		this.water = water;

		// UpdateSun();
	},

	tick() {
		let speed = 480 - (360 * this.el.sceneEl.components.drama.intensity);
		this.water.material.uniforms.time.value += 1.0 / speed;
	}
});
