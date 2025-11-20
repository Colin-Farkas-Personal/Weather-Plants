import type { Scene } from 'three';
import * as THREE from 'three';
import type { SceneSubject } from './subject.types';

interface SkyOptions {
	scene: Scene;
	topColor?: string | number | THREE.Color;
	bottomColor?: string | number | THREE.Color;
	offset?: number;
	exponent?: number;
}

interface SkyUpdateOptions {
	topColor?: string | number | THREE.Color;
	bottomColor?: string | number | THREE.Color;
	offset?: number;
	exponent?: number;
}

export class Sky implements SceneSubject {
	private scene: Scene;
	private mesh: THREE.Mesh;
	private geometry: THREE.SphereGeometry;
	private material: THREE.ShaderMaterial;

	constructor({
		scene,
		topColor = '#cfe7ff',
		bottomColor = '#e8e6e2',
		offset = 0.0,
		exponent = 1.5,
	}: SkyOptions) {
		this.scene = scene;

		// Create inverted sphere geometry (faces inward)
		this.geometry = new THREE.SphereGeometry(500, 64, 64);
		this.geometry.scale(-1, 1, 1);

		// Shader material for vertical gradient
		this.material = new THREE.ShaderMaterial({
			side: THREE.BackSide,
			depthWrite: false,
			uniforms: {
				topColor: { value: new THREE.Color(topColor as any) },
				bottomColor: { value: new THREE.Color(bottomColor as any) },
				offset: { value: offset },
				exponent: { value: exponent },
			},
			vertexShader: `
				varying float vHeight;
				void main(){
					vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
					vHeight = normalize(position).y; // -1..1
					gl_Position = projectionMatrix * mvPosition;
				}
			`,
			fragmentShader: `
				varying float vHeight;
				uniform vec3 topColor;
				uniform vec3 bottomColor;
				uniform float offset;
				uniform float exponent;
				void main(){
					float t = clamp((vHeight + 1.0) * 0.5 + offset, 0.0, 1.0);
					t = pow(t, exponent);
					gl_FragColor = vec4(mix(bottomColor, topColor, t), 1.0);
				}
			`,
		});

		this.mesh = new THREE.Mesh(this.geometry, this.material);
		this.mesh.renderOrder = -1; // Render first
		this.mesh.frustumCulled = false; // Always render
		this.scene.add(this.mesh);
	}

	update() {
		// Add later...
		///
		///
		///
		// if (options.topColor !== undefined) {
		// 	this.material.uniforms.topColor.value.set(options.topColor as any);
		// }
		// if (options.bottomColor !== undefined) {
		// 	this.material.uniforms.bottomColor.value.set(options.bottomColor as any);
		// }
		// if (options.offset !== undefined) {
		// 	this.material.uniforms.offset.value = options.offset;
		// }
		// if (options.exponent !== undefined) {
		// 	this.material.uniforms.exponent.value = options.exponent;
		// }
	}

	dispose(): void {
		this.scene.remove(this.mesh);
		this.geometry.dispose();
		this.material.dispose();
	}
}
