import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = () => {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Create "Hand" - using multiple geometric shapes
    const handGroup = new THREE.Group();

    // Palm (main part)
    const palmGeometry = new THREE.BoxGeometry(1.5, 2, 0.5);
    const palmMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.2,
    });
    const palm = new THREE.Mesh(palmGeometry, palmMaterial);
    handGroup.add(palm);

    // Fingers
    const fingerGeometry = new THREE.BoxGeometry(0.3, 1, 0.3);
    const fingerMaterial = new THREE.MeshStandardMaterial({
      color: 0xec4899,
      metalness: 0.7,
      roughness: 0.2,
      emissive: 0xec4899,
      emissiveIntensity: 0.2,
    });

    const fingerPositions = [
      [-0.6, 1.2, 0],
      [-0.3, 1.3, 0],
      [0, 1.3, 0],
      [0.3, 1.2, 0],
      [0.6, 1, 0],
    ];

    fingerPositions.forEach(pos => {
      const finger = new THREE.Mesh(fingerGeometry, fingerMaterial);
      finger.position.set(...pos);
      handGroup.add(finger);
    });

    // Add glow spheres around hand
    const glowGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < 20; i++) {
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      const angle = (i / 20) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      glow.position.set(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        -2 + Math.random() * 4
      );
      scene.add(glow);
    }

    scene.add(handGroup);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x8b5cf6, 2, 100);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xec4899, 1.5);
    spotLight.position.set(5, 5, 5);
    spotLight.castShadow = true;
    scene.add(spotLight);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 50;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.05,
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse move handler
    const handleMouseMove = (event) => {
      mousePosition.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePosition.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      targetRotation.current.y = mousePosition.current.x * Math.PI * 0.3;
      targetRotation.current.x = mousePosition.current.y * Math.PI * 0.3;
      
      targetPosition.current.x = mousePosition.current.x * 2;
      targetPosition.current.y = mousePosition.current.y * 2;

      // Move lights
      pointLight.position.x = mousePosition.current.x * 5;
      pointLight.position.y = mousePosition.current.y * 5;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Smooth lerp for rotation
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.08;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.08;

      // Smooth lerp for position
      currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * 0.05;
      currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * 0.05;

      // Apply to hand
      handGroup.rotation.x = currentRotation.current.x + Math.sin(time) * 0.1;
      handGroup.rotation.y = currentRotation.current.y + Math.cos(time * 0.7) * 0.1;
      handGroup.rotation.z = Math.sin(time * 0.5) * 0.05;
      
      handGroup.position.x = currentPosition.current.x;
      handGroup.position.y = currentPosition.current.y;
      handGroup.position.z = Math.sin(time * 0.3) * 0.3;

      // Animate particles
      particlesMesh.rotation.y = time * 0.05;
      particlesMesh.rotation.x = time * 0.03;

      // Pulse effect
      const scale = 1 + Math.sin(time * 2) * 0.05;
      handGroup.scale.set(scale, scale, scale);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        background: 'radial-gradient(circle at center, #0a0a0a 0%, #000000 100%)',
      }}
    />
  );
};

export default ThreeBackground;

