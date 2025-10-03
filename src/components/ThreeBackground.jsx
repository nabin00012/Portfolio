import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeBackground = ({ currentSection = 0 }) => {
  const containerRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const currentRotation = useRef({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const currentPosition = useRef({ x: 0, y: 0 });
  const morphProgress = useRef(0);

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

    // Create morphing organic shape - like Lenis hand
    const handGroup = new THREE.Group();

    // Create fluid organic shape using sphere with displacement
    const handGeometry = new THREE.SphereGeometry(2, 64, 64);
    
    // Add random displacement for organic feel
    const positions = handGeometry.attributes.position;
    const vertex = new THREE.Vector3();
    for (let i = 0; i < positions.count; i++) {
      vertex.fromBufferAttribute(positions, i);
      const noise = Math.sin(vertex.x * 2) * Math.cos(vertex.y * 2) * 0.3;
      vertex.normalize().multiplyScalar(2 + noise);
      positions.setXYZ(i, vertex.x, vertex.y, vertex.z);
    }
    handGeometry.computeVertexNormals();

    const handMaterial = new THREE.MeshStandardMaterial({
      color: 0x8b5cf6,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x8b5cf6,
      emissiveIntensity: 0.3,
      wireframe: false,
    });
    
    const hand = new THREE.Mesh(handGeometry, handMaterial);
    handGroup.add(hand);

    // Add inner glow sphere
    const glowGeometry = new THREE.SphereGeometry(1.8, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xec4899,
      transparent: true,
      opacity: 0.4,
      side: THREE.BackSide,
    });
    const glow = new THREE.Mesh(glowGeometry, glowMaterial);
    handGroup.add(glow);

    // Add orbiting elements around hand
    const orbitGroup = new THREE.Group();
    const orbitGeometry = new THREE.TorusGeometry(0.2, 0.08, 16, 32);
    
    for (let i = 0; i < 3; i++) {
      const orbitMaterial = new THREE.MeshStandardMaterial({
        color: i === 0 ? 0x00ff88 : i === 1 ? 0x00d4ff : 0xff0080,
        metalness: 0.8,
        roughness: 0.2,
        emissive: i === 0 ? 0x00ff88 : i === 1 ? 0x00d4ff : 0xff0080,
        emissiveIntensity: 0.5,
      });
      const orbit = new THREE.Mesh(orbitGeometry, orbitMaterial);
      const angle = (i / 3) * Math.PI * 2;
      const radius = 3 + i * 0.5;
      orbit.position.set(Math.cos(angle) * radius, Math.sin(angle) * radius, 0);
      orbitGroup.add(orbit);
    }
    scene.add(orbitGroup);
    scene.add(handGroup);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const mainLight = new THREE.PointLight(0x00ff88, 3, 100);
    mainLight.position.set(0, 0, 8);
    scene.add(mainLight);

    const accentLight1 = new THREE.PointLight(0x00d4ff, 2, 50);
    accentLight1.position.set(-5, 3, 3);
    scene.add(accentLight1);

    const accentLight2 = new THREE.PointLight(0xff0080, 2, 50);
    accentLight2.position.set(5, -3, 3);
    scene.add(accentLight2);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.position.set(0, 10, 10);
    spotLight.angle = Math.PI / 6;
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
      
      targetPosition.current.x = mousePosition.current.x * 1.5;
      targetPosition.current.y = mousePosition.current.y * 1.5;

      // Move lights dynamically
      mainLight.position.x = mousePosition.current.x * 4;
      mainLight.position.y = mousePosition.current.y * 4;
      accentLight1.position.x = -5 + mousePosition.current.x * 2;
      accentLight2.position.x = 5 - mousePosition.current.x * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;

      // Ultra smooth lerp for rotation
      currentRotation.current.x += (targetRotation.current.x - currentRotation.current.x) * 0.05;
      currentRotation.current.y += (targetRotation.current.y - currentRotation.current.y) * 0.05;

      // Smooth lerp for position with lag
      currentPosition.current.x += (targetPosition.current.x - currentPosition.current.x) * 0.03;
      currentPosition.current.y += (targetPosition.current.y - currentPosition.current.y) * 0.03;

      // Organic morphing effect
      morphProgress.current = (Math.sin(time * 0.5) + 1) * 0.5;
      
      // Apply to hand with creative movement
      handGroup.rotation.x = currentRotation.current.x + Math.sin(time * 0.8) * 0.15;
      handGroup.rotation.y = currentRotation.current.y + Math.cos(time * 0.6) * 0.15;
      handGroup.rotation.z = Math.sin(time * 0.4) * 0.1 + morphProgress.current * 0.2;
      
      handGroup.position.x = currentPosition.current.x + Math.sin(time * 0.3) * 0.2;
      handGroup.position.y = currentPosition.current.y + Math.cos(time * 0.4) * 0.2;
      handGroup.position.z = Math.sin(time * 0.5) * 0.5;

      // Organic breathing scale
      const scale = 1 + Math.sin(time * 1.5) * 0.08 + morphProgress.current * 0.1;
      handGroup.scale.set(scale, scale, scale);

      // Animate orbiting elements
      orbitGroup.rotation.y = time * 0.3;
      orbitGroup.rotation.x = Math.sin(time * 0.2) * 0.3;

      // Animate particles
      particlesMesh.rotation.y = time * 0.08;
      particlesMesh.rotation.x = time * 0.05;

      // Color shift based on section
      const colorShift = currentSection * 0.2;
      handMaterial.emissiveIntensity = 0.3 + Math.sin(time + colorShift) * 0.2;

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

