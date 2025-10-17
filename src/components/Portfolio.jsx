import React, { useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import ThreeBackground from './ThreeBackground';
import './Portfolio.css';

const Portfolio = () => {
  const [scrollY, setScrollY] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const sectionsRef = useRef([]);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    lenis.on('scroll', ({ scroll }) => {
      setScrollY(scroll);

      // Determine current section based on scroll position
      const windowHeight = window.innerHeight;
      const sectionIndex = Math.floor(scroll / (windowHeight * 0.8));
      setCurrentSection(Math.min(sectionIndex, sectionsRef.current.length - 1));
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (index) => {
    const section = sectionsRef.current[index];
    if (section && lenisRef.current) {
      lenisRef.current.scrollTo(section, { duration: 1.5 });
    }
  };

  // Projects data - REAL PROJECTS
  const projects = [
    {
      id: 1,
      title: 'CodeCommons',
      description: 'A modern collaborative platform for managing and tracking academic projects with cosmic-themed interface. Recognized by Jain University for innovation.',
      image: '/images/codecommons.png',
      tags: ['Next.js', 'MongoDB', 'Express.js', 'TypeScript', 'Socket.IO'],
      year: '2025',
      github: 'https://github.com/nabin00012/codecommons',
      live: 'https://codecommons-delta.vercel.app',
      recognition: '🏆 Recognized by Jain University',
    },
    {
      id: 2,
      title: 'MERN-CI-CD-Kube',
      description: 'A production-grade real-time chat application built with the MERN stack, featuring automated CI/CD pipelines via GitHub Actions and containerized Kubernetes deployment. Demonstrates enterprise-level DevOps practices with seamless scaling and zero-downtime deployments.',
  // Use provided project thumbnail image
  image: '/images/Mern-thumbnail.png?v=2',
      tags: ['MERN Stack', 'Kubernetes', 'Docker', 'GitHub Actions', 'CI/CD'],
      year: '2024',
  github: 'https://github.com/nabin00012/mern-ci-cd-kube',
  live: 'https://mern-ci-cd-kube.vercel.app/',
    },
    {
      id: 3,
      title: 'SecureFinData',
      description: '🔒 Military-grade financial data security platform featuring AES-256-GCM encryption with RSA-OAEP envelope encryption. Built on zero-trust architecture with role-based access control, comprehensive audit trails, and intelligent analytics for extracting financial metrics from Excel/PDF files. Production-ready with real-time processing and modern Material-UI design.',
      image: 'https://images.unsplash.com/photo-1633265486064-086b219458ec?w=1200&q=80',
      tags: ['React', 'Node.js', 'AES-256', 'RSA', 'Material-UI', 'Security'],
      year: '2024',
      github: 'https://github.com/nabin00012/secure-fin-data',
      live: '#',
    },
    {
      id: 4,
      title: 'FluxTrade',
      description: 'A decentralized crypto trading platform built with MERN + Solidity. Peer-to-peer token swaps with on-chain smart contracts, real-time prices, and wallet integration. Trustless, no middlemen.',
  image: '/images/fluxtrade.png?v=2',
      tags: ['MERN', 'Solidity', 'Web3', 'Smart Contracts', 'Real-time'],
      year: '2025',
      github: 'https://github.com/nabin00012/fluxtrade',
      live: 'https://flux-trade-nine.vercel.app/',
    },
  ];

  // Skills data with SVG icons
  const skills = [
    {
      name: 'JavaScript & TypeScript',
      level: 95,
      color: '#3178C6',
      description: 'Core languages for modern web',
      svgIcon: '<svg viewBox="0 0 128 128" width="60" height="60"><path fill="#3178C6" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23 23 0 0180 109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51.4 59h21.99z"/></svg>'
    },
    {
      name: 'React & Next.js',
      level: 98,
      color: '#61DAFB',
      description: 'Building scalable web apps',
      svgIcon: '<svg viewBox="0 0 128 128" width="60" height="60"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21c-1.2-2-2.2-4.1-3.4-6.2-1.2-2.1-2.4-4.1-3.6-6 3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3zm-11.5-31.8c9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9z"/></g></svg>'
    },
    {
      name: 'Node.js & Express',
      level: 92,
      color: '#339933',
      description: 'Backend API development',
      svgIcon: '<svg viewBox="0 0 128 128" width="60" height="60"><path fill="#339933" d="M112.678 30.334L68.535 4.729c-2.781-1.584-6.424-1.584-9.227 0L14.82 30.334C11.951 31.985 10 35.088 10 38.407v51.142c0 3.319 1.951 6.423 4.82 8.073l11.321 6.551c6.127 3.087 8.32 3.087 11.145 3.087 9.13 0 14.365-5.538 14.365-15.183V42.93c0-.457-.365-.822-.822-.822h-3.555c-.456 0-.822.365-.822.822v49.147c0 3.753-3.896 7.548-10.247 4.36l-11.866-6.838c-.309-.182-.511-.513-.511-.87V37.585c0-.356.202-.688.511-.87l44.245-25.533c.304-.176.667-.176.971 0l44.245 25.533c.309.182.511.514.511.87v51.142c0 .357-.202.689-.511.87l-44.245 25.534c-.304.176-.667.176-.971 0l-11.301-6.673c-.287-.17-.637-.23-.992-.14-2.533.722-3.04.864-5.422 1.314-.569.108-1.428.268.305 1.244l14.751 8.778c1.39.804 2.95 1.213 4.531 1.213 1.581 0 3.141-.409 4.531-1.213l44.143-25.533c2.869-1.65 4.82-4.754 4.82-8.073V38.407c0-3.319-1.951-6.422-4.82-8.073zM77.727 81.445c-11.726 0-14.309-3.235-15.17-9.066-.102-.628-.598-1.102-1.228-1.102h-3.652c-.678 0-1.228.55-1.228 1.228 0 7.187 3.917 15.745 21.278 15.745 12.772 0 20.186-5.041 20.186-13.766 0-8.664-5.837-10.966-18.019-12.584-12.27-1.628-13.38-2.439-13.38-5.307 0-2.347 1.045-5.475 10.053-5.475 7.928 0 10.858 1.718 12.052 7.098.106.538.569.94 1.113.94h3.662c.337 0 .658-.139.887-.388.229-.249.337-.585.288-.907-.931-11.037-8.054-16.195-21.002-16.195-12.018 0-19.168 5.082-19.168 13.602 0 8.757 6.782 11.177 17.592 12.273 12.916 1.313 13.807 3.274 13.807 5.704 0 4.423-3.558 6.281-11.932 6.281z"/></svg>'
    },
    {
      name: 'MongoDB',
      level: 90,
      color: '#47A248',
      description: 'Schema design & optimization',
      svgIcon: '<svg viewBox="0 0 128 128" width="60" height="60"><path fill="#47A248" d="M88.038 42.812c1.605 4.643 2.761 9.383 3.141 14.296.472 6.095.256 12.147-1.029 18.142-.035.165-.109.32-.164.48-.403.001-.814-.049-1.208.012-3.329.523-6.655 1.065-9.981 1.604-3.438.557-6.881 1.092-10.313 1.687-1.216.21-2.721-.041-3.212 1.641-.014.046-.154.054-.235.08l.166-10.051c-.057-8.084-.113-16.168-.169-24.252l1.602-.275c2.62-.429 5.24-.864 7.862-1.281 3.129-.497 6.261-.98 9.392-1.465 1.381-.215 2.764-.412 4.148-.618z"/><path fill="#47A248" d="M61.729 110.054c-1.69-1.453-3.439-2.842-5.059-4.37-8.717-8.222-15.093-17.899-18.233-29.566-.865-3.211-1.442-6.474-1.627-9.792-.13-2.322-.318-4.665-.154-6.975.437-6.144 1.325-12.229 3.127-18.147l.099-.138c.175.233.427.439.516.702 1.759 5.18 3.505 10.364 5.242 15.551 5.458 16.3 10.909 32.604 16.376 48.9.107.318.384.579.583.866l-.87 2.969z"/><path fill="#47A248" d="M88.038 42.812c-1.384.206-2.768.403-4.149.618-3.131.485-6.263.968-9.392 1.465-2.622.417-5.242.852-7.862 1.281l-1.602.275-.012-1.045c-.053-4.905-.095-9.81-.123-14.715-.014-2.386.114-4.769.259-7.15.146-2.407.502-4.795.908-7.171.008-.042.044-.081.076-.128.141.042.317.064.422.146 1.235.971 2.466 1.956 3.695 2.935 8.771 6.983 16.781 14.647 23.13 23.688l.09.112c-.093.104-.18.211-.264.319-1.366 1.65-2.729 3.304-4.09 4.958-.488.593-.98 1.182-1.478 1.777-.042.05-.12.086-.18.129l-.428-.489z"/></svg>'
    },
    {
      name: 'Express.js',
      level: 92,
      color: '#000000',
      description: 'Backend framework',
      svgIcon: '<svg viewBox="0 0 128 128" width="60" height="60"><path fill="#ffffff" d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.4 3.7l26.92-36.13L67.6 29.71c4.31-.84 7.29-.41 9.93 3.45 5.83 8.52 12.26 16.63 18.67 25.21 6.45-8.55 12.8-16.67 18.8-25.11 2.41-3.42 5-4.72 9.33-3.46-3.28 4.35-6.49 8.63-9.72 12.88-4.36 5.73-8.64 11.53-13.16 17.14-1.61 2-1.35 3.3.09 5.19C109.9 76 118.16 87.1 126.67 98.44zM1.33 61.74c.72-3.61 1.2-7.29 2.2-10.83 6-21.43 30.6-30.34 47.5-17.06C60.93 41.64 63.39 52.62 62.9 65H7.1c-.84 22.21 15.15 35.62 35.53 28.78 7.15-2.4 11.36-8 13.47-15 1.07-3.51 2.84-4.06 6.14-3.06-1.69 8.76-5.52 16.08-13.52 20.66-12 6.86-29.13 4.64-38.14-4.89C5.26 85.89 3 78.92 2 71.39c-.15-1.2-.46-2.38-.7-3.57q.03-3.04.03-6.08zm5.87-1.49h50.43c-.33-16.06-10.33-27.47-24-27.57-15-.12-25.78 11.02-26.43 27.57z"/></svg>'
    },
    {
      name: 'Three.js & WebGL',
      level: 88,
      color: '#000000',
      description: '3D web experiences',
      svgIcon: '<svg viewBox="0 0 128 128" width="60" height="60"><path fill="#ffffff" d="M0 0h128v128H0z"/><path fill="#000000" d="M89.21 94.23L47.71 72.8 36.84 94.67l40.91 21.77-7.54-22.21zm32.58-48.59L94.15 33.28 74.28 64l39.68 12.18-17.17-30.54zM26.71 63.91L6.84 33.28 80.5 83.89 26.71 63.91zm53.09-27.36l7.54-22.2L45.43 35.11l41.37-20.56z"/></svg>'
    },
    {
      name: 'Tailwind CSS',
      level: 94,
      color: '#06B6D4',
      description: 'Modern utility-first CSS',
      svgIcon: '<svg viewBox="0 0 128 128" width="60" height="60"><path fill="#06B6D4" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0"/></svg>'
    },
    {
      name: 'Git & GitHub',
      level: 96,
      color: '#F05032',
      description: 'Version control & collaboration',
      svgIcon: '<svg viewBox="0 0 128 128" width="60" height="60"><g fill="#F05032"><path d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"/></g></svg>'
    },
    {
      name: 'RESTful APIs',
      level: 93,
      color: '#E10098',
      description: 'API design & development',
      svgIcon: '<svg viewBox="0 0 128 128" width="60" height="60"><path fill="#E10098" d="M64.026 22.023c-1.483 0-2.686 1.206-2.686 2.696 0 1.482 1.203 2.685 2.686 2.685 1.481 0 2.684-1.203 2.684-2.685 0-1.49-1.203-2.696-2.684-2.696zM50.932 28.942a2.699 2.699 0 00-2.697 2.697c0 1.49 1.206 2.686 2.697 2.686 1.481 0 2.685-1.196 2.685-2.686a2.683 2.683 0 00-2.685-2.697zm26.188 0a2.698 2.698 0 00-2.696 2.697c0 1.49 1.203 2.686 2.696 2.686 1.482 0 2.686-1.196 2.686-2.686a2.688 2.688 0 00-2.686-2.697zM39.513 38.835a2.687 2.687 0 00-2.686 2.686c0 1.49 1.203 2.696 2.686 2.696 1.49 0 2.696-1.206 2.696-2.696a2.697 2.697 0 00-2.696-2.686zm48.974 0c-1.482 0-2.685 1.203-2.685 2.686 0 1.49 1.203 2.696 2.685 2.696a2.698 2.698 0 002.697-2.696 2.689 2.689 0 00-2.697-2.686z"/></svg>'
    },
    {
      name: 'JWT & Stripe',
      level: 89,
      color: '#635BFF',
      description: 'Authentication & payments',
      svgIcon: '<svg viewBox="0 0 128 128" width="60" height="60"><path fill="#635BFF" d="M49.676 65.61c0-4.169 3.383-6.123 9.109-6.123 8.241 0 18.68 2.484 26.921 6.919V51.009c-8.908-3.516-17.763-4.969-26.921-4.969-22.028 0-36.888 11.517-36.888 30.71 0 29.951 41.235 25.172 41.235 38.091 0 4.969-4.329 6.59-10.388 6.59-8.961 0-20.412-3.649-29.521-8.575v15.863c10.014 4.503 20.118 6.456 29.521 6.456 22.481 0 38.021-11.131 38.021-30.576.027-32.304-41.129-26.528-41.129-39.939zM127.477 1H.523A.523.523 0 000 1.523v125.954c0 .288.235.523.523.523h126.954c.288 0 .523-.235.523-.523V1.523A.523.523 0 00127.477 1z"/></svg>'
    },
  ];

  // Experience data
  const experience = [
    {
      id: 1,
      role: 'Full-Stack Development Intern',
      company: 'Octanet Services',
      period: 'Extended from 2 to 6 months',
      highlight: '⭐ Performance exceeded expectations - Extended 3x due to outstanding work',
      description: 'Built complete user dashboard using React.js 18.2.0 with functional components. Implemented useState and useEffect hooks for state management and API calls. Created profile edit form with Formik library for form handling and Yup for validation schema.',
      achievements: [
        'User Dashboard & Profile Management System shipped to production',
        'Zero critical issues in production deployment',
        'Became go-to intern for complex React component development',
        'Integrated Axios for HTTP requests to Node.js/Express backend APIs',
        'Used React Router v6 for client-side navigation'
      ],
      technologies: ['React.js 18.2.0', 'Formik', 'Yup', 'Axios', 'Express.js', 'React Router v6'],
      offerLetter: true,
    },
  ];

  // Certifications data - REAL CERTIFICATIONS
  const certifications = [
    {
      id: 1,
      title: 'Microsoft Azure AI Essentials Professional Certificate',
      issuer: 'Microsoft & LinkedIn',
      icon: '☁️',
      color: '#0078D4',
      skills: 'Machine Learning, Azure, NLP, Generative AI',
      pdfLink: '/certificates/azure-ai-essentials.pdf',
      thumbnail: '/images/azure-ai-essentials-cert.png',
      isImage: true
    },
    {
      id: 2,
      title: 'Microsoft Azure AI Essentials: Workloads and ML',
      issuer: 'LinkedIn',
      icon: '🤖',
      color: '#0A66C2',
      skills: 'Azure AI Foundry',
      pdfLink: '/certificates/azure-ml-workloads.pdf',
      thumbnail: '/images/azure-ml-workloads-cert.png',
      isImage: true
    },
    {
      id: 3,
      title: 'Practical GitHub Actions',
      issuer: 'LinkedIn',
      icon: '⚙️',
      color: '#2088FF',
      skills: 'GitHub, CI/CD',
      pdfLink: '/certificates/github-actions.pdf',
      thumbnail: '/images/github-actions-cert.png',
      isImage: true
    },
    {
      id: 4,
      title: 'Practical GitHub Code Search',
      issuer: 'LinkedIn',
      icon: '🔍',
      color: '#2088FF',
      skills: 'GitHub',
      pdfLink: '/certificates/github-code-search.pdf',
      thumbnail: '/images/github-code-search-cert.png',
      isImage: true
    },
    {
      id: 5,
      title: 'Practical GitHub Copilot',
      issuer: 'LinkedIn',
      icon: '🤖',
      color: '#2088FF',
      skills: 'GitHub Copilot, AI Coding',
      pdfLink: '/certificates/github-copilot.pdf',
      thumbnail: '/images/github-copilot-cert.png',
      isImage: true
    },
    {
      id: 6,
      title: 'Practical GitHub Project Management',
      issuer: 'LinkedIn',
      icon: '📊',
      color: '#0A66C2',
      skills: 'GitHub, Project Management',
      pdfLink: '/certificates/github-project-mgmt.pdf',
      thumbnail: '/images/github-project-mgmt-cert.png',
      isImage: true
    },
    {
      id: 7,
      title: 'SEO Foundations',
      issuer: 'LinkedIn',
      icon: '🔍',
      color: '#0A66C2',
      skills: 'SEO, Web Optimization',
      pdfLink: '/certificates/seo-foundations.pdf',
      thumbnail: '/images/seo-foundations-cert.png',
      isImage: true
    },
    {
      id: 8,
      title: 'Introduction to Networking',
      issuer: 'NVIDIA',
      icon: '🌐',
      color: '#76B900',
      skills: 'Networking Fundamentals',
      pdfLink: '/images/nvidia-cert.png',
      thumbnail: '/images/nvidia-cert.png',
      isImage: true
    },
    {
      id: 9,
      title: 'Intro to Operating Systems: Virtualization',
      issuer: 'Codio',
      icon: '💻',
      color: '#FF6B35',
      skills: 'OS, Virtualization',
      pdfLink: '/images/codio-cert.png',
      thumbnail: '/images/codio-cert.png',
      isImage: true
    },
    {
      id: 10,
      title: 'Node.js Essential Training',
      issuer: 'LinkedIn',
      icon: '🟢',
      color: '#339933',
      skills: 'Node.js, Server-side JavaScript',
      pdfLink: '/certificates/nodejs-essential-training.pdf',
      thumbnail: '/images/nodejs-essential-training-cert.png',
      isImage: true
    },
  ];

  return (
    <div className="portfolio-wrapper">
      {/* Three.js 3D Background */}
      <ThreeBackground currentSection={currentSection} />

      {/* Section Progress Indicator */}
      <div className="section-progress">
        {['Hero', 'About', 'Experience', 'Skills', 'Certs', 'Projects', 'Contact'].map((label, index) => (
          <button
            key={index}
            className={`progress-dot ${currentSection === index ? 'active' : ''}`}
            onClick={() => scrollToSection(index)}
            aria-label={label}
            title={label}
          >
            <span className="dot-inner"></span>
          </button>
        ))}
      </div>

      {/* Scroll Progress Bar */}
      <div className="scroll-progress-bar">
        <div
          className="scroll-progress-fill"
          style={{
            width: `${(scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100}%`
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="main-navigation">
        <div className="nav-brand">
          <span className="brand-text">NC</span>
          <span className="brand-dot"></span>
        </div>
        <div className="nav-menu">
          <button onClick={() => scrollToSection(1)} className="nav-item">About</button>
          <button onClick={() => scrollToSection(2)} className="nav-item">Experience</button>
          <button onClick={() => scrollToSection(5)} className="nav-item">Projects</button>
          <button onClick={() => scrollToSection(6)} className="nav-item">Contact</button>
        </div>
        <a
          href="/resume-nabin-chapagain.pdf"
          download="Nabin_Chapagain_Resume.pdf"
          className="nav-resume-button"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15M7 10L12 15M12 15L17 10M12 15V3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span>Resume</span>
        </a>
      </nav>

      {/* Section 0: Hero */}
      <section
        className="hero-section"
        ref={(el) => (sectionsRef.current[0] = el)}
      >
        <div className="hero-content">
          <div className="hero-label">
            <span className="status-indicator"></span>
            <span>Available for select projects</span>
          </div>

          <h1 className="hero-title">
            <span className="title-line">Nabin</span>
            <span className="title-line gradient-title">Chapagain</span>
          </h1>

          <p className="hero-subtitle">
            BTech CS Student at Jain University
            <br />
            Full-Stack Developer | 3D Web Enthusiast
          </p>

          <div className="hero-cta">
            <button className="primary-button" onClick={() => scrollToSection(2)}>
              <span>View Selected Work</span>
              <div className="button-glow"></div>
            </button>
            <button className="secondary-button" onClick={() => scrollToSection(4)}>
              <span>Get In Touch</span>
            </button>
          </div>

          <div className="hero-metrics">
            <div className="metric-item">
              <div className="metric-value">11+</div>
              <div className="metric-label">Certifications</div>
            </div>
            <div className="metric-divider"></div>
            <div className="metric-item">
              <div className="metric-value">6M</div>
              <div className="metric-label">Internship Extended</div>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <div className="scroll-line-wrapper">
            <div className="scroll-line"></div>
          </div>
          <span className="scroll-text">Scroll to explore</span>
        </div>
      </section>

      {/* Section 1: About */}
      <section
        className="about-section"
        ref={(el) => (sectionsRef.current[1] = el)}
      >
        <div className="section-header">
          <h2 className="section-title">
            About
            <span className="gradient-title"> Me</span>
          </h2>
          <p className="section-subtitle">
            Web enthusiast turning ideas into real, working applications
          </p>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p className="about-paragraph">
              Hi there! I'm a web enthusiast who loves turning ideas into real, working applications.
              My main tools of choice are <strong>React, Next.js, Node.js, TypeScript, Express.js</strong> and <strong>MongoDB</strong>,
              with <strong>Tailwind CSS</strong> for that clean, modern look. I focus on building apps that are not just
              functional but also easy and enjoyable to use.
            </p>
            <p className="about-paragraph">
              Right now, I'm studying <strong>Computer Science at Jain (Deemed-to-be University)</strong>, where I'm
              blending theory with hands-on experience by working on personal projects and solving real problems.
              I enjoy learning new tech, tackling challenges, and finding clever solutions that make life easier for users.
            </p>
            <p className="about-paragraph">
              I believe good software doesn't need to be complicated – it should just work. And I'm on a mission
              to build exactly that. <strong>Always coding, always improving, always curious.</strong>
            </p>
          </div>

        </div>
      </section>

      {/* Section 2: Experience Timeline */}
      <section
        className="experience-section"
        ref={(el) => (sectionsRef.current[2] = el)}
      >
        <div className="section-header">
          <h2 className="section-title">
            Career
            <span className="gradient-title"> Journey</span>
          </h2>
          <p className="section-subtitle">
            My professional path in building digital products
          </p>
        </div>

        <div className="timeline-container">
          {experience.map((job, index) => (
            <div key={job.id} className="timeline-item" data-index={index}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-header">
                  <h3 className="job-role">{job.role}</h3>
                  <span className="job-period">{job.period}</span>
                </div>
                <h4 className="job-company">{job.company}</h4>
                {job.highlight && (
                  <div className="job-highlight">{job.highlight}</div>
                )}
                <p className="job-description">{job.description}</p>
                {job.achievements && (
                  <div className="job-achievements">
                    <h5 className="achievements-title">Key Achievements:</h5>
                    <ul className="achievements-list">
                      {job.achievements.map((achievement, idx) => (
                        <li key={idx}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="job-tech">
                  {job.technologies.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>
                {job.offerLetter && (
                  <a href="/offer-letter-octanet.pdf" target="_blank" rel="noopener noreferrer" className="offer-letter-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" />
                      <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    View Offer Letter
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 3: CRAZY Skills Section */}
      <section
        className="skills-crazy-section"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="section-header">
          <h2 className="section-title">
            Technical
            <span className="gradient-title"> Arsenal</span>
          </h2>
          <p className="section-subtitle">
            Cutting-edge technologies I wield to build the future
          </p>
        </div>

        <div className="skills-crazy-grid">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="skill-crazy-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skill-crazy-inner">
                <div className="skill-crazy-front">
                  <div className="skill-icon-large" dangerouslySetInnerHTML={{ __html: skill.svgIcon }} />
                  <h3 className="skill-crazy-name">{skill.name}</h3>
                  <div className="skill-level-display">
                    <div className="skill-level-circle" style={{
                      background: `conic-gradient(${skill.color} ${skill.level * 3.6}deg, rgba(255,255,255,0.1) 0deg)`
                    }}>
                      <div className="skill-level-inner">
                        <span className="skill-level-number">{skill.level}%</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="skill-crazy-back" style={{ borderColor: skill.color }}>
                  <p className="skill-description">{skill.description}</p>
                  <div className="skill-stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < Math.floor(skill.level / 20) ? 'filled' : ''}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 4: Certificates & Achievements */}
      <section
        className="certifications-section"
        ref={(el) => (sectionsRef.current[4] = el)}
      >
        <div className="section-header">
          <h2 className="section-title">
            Certificates &
            <span className="gradient-title"> Achievements</span>
          </h2>
          <p className="section-subtitle">
            Industry-recognized credentials and leaderboard highlights
          </p>
        </div>

        <div className="certifications-grid">
          {/* Coding Ninjas Leaderboard Achievement Card */}
          <div className="cert-card" style={{ animationDelay: `0s` }}>
            <div className="cert-thumbnail-wrapper">
              <img src="/images/codingninjas-leaderboard.png" alt="Coding Ninjas Leaderboard" className="cert-thumbnail" style={{objectFit: 'cover', background: '#fff'}} />
              <div className="cert-thumbnail-overlay">
                <span className="view-full-text">View Leaderboard</span>
              </div>
            </div>
            <div className="cert-content">
              <div className="cert-icon-wrapper" style={{ background: '#FF660020', borderColor: '#FF6600' }}>
                <span className="cert-icon" style={{ color: '#FF6600' }}>🏆</span>
              </div>
              <h3 className="cert-title">Coding Ninjas Code360 Leaderboard</h3>
              <p className="cert-issuer">Ranked 1st • Code360 Weekly Challenge</p>
              <p className="cert-skills">Competitive Programming, Problem Solving, Consistency</p>
              <a href="/images/codingninjas-leaderboard.png" target="_blank" rel="noopener noreferrer" className="cert-view-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" />
                  <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" />
                </svg>
                View Leaderboard
              </a>
            </div>
            <div className="cert-shine"></div>
          </div>
          {/* Existing certificates */}
          {certifications.map((cert, index) => (
            <div
              key={cert.id}
              className="cert-card"
              style={{ animationDelay: `${(index + 1) * 0.15}s` }}
            >
              {/* Certificate Thumbnail Preview */}
              <div className="cert-thumbnail-wrapper">
                {cert.isImage ? (
                  <img src={cert.thumbnail} alt={cert.title} className="cert-thumbnail" />
                ) : (
                  <iframe
                    src={`${cert.thumbnail}#toolbar=0&navpanes=0&scrollbar=0`}
                    className="cert-thumbnail-pdf"
                    title={cert.title}
                  />
                )}
                <div className="cert-thumbnail-overlay">
                  <span className="view-full-text">Click to view full certificate</span>
                </div>
              </div>

              <div className="cert-content">
                <div className="cert-icon-wrapper" style={{ background: `${cert.color}20`, borderColor: cert.color }}>
                  <span className="cert-icon" style={{ color: cert.color }}>{cert.icon}</span>
                </div>
                <h3 className="cert-title">{cert.title}</h3>
                <p className="cert-issuer">{cert.issuer}</p>
                <p className="cert-skills">{cert.skills}</p>

                <a href={cert.pdfLink} target="_blank" rel="noopener noreferrer" className="cert-view-btn">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" stroke="currentColor" strokeWidth="2" />
                    <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  View Certificate
                </a>
              </div>
              <div className="cert-shine"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Projects - Horizontal Scroll */}
      <section
        className="projects-section"
        ref={(el) => (sectionsRef.current[5] = el)}
      >
        <div className="projects-header">
          <h2 className="section-title">
            Selected
            <span className="gradient-title"> Work</span>
          </h2>
          <p className="projects-hint">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            Scroll horizontally
          </p>
        </div>

        <div className="projects-horizontal-scroll">
          {projects.map((project, index) => (
            <div key={project.id} className="project-card-horizontal">
              <div className="project-number">0{index + 1}</div>
              <div className="project-year">{project.year}</div>

              <div className="project-image-container">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-image"
                  loading="lazy"
                />
                <div className="project-image-overlay">
                  <div className="project-overlay-buttons">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-view-button">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      <span>GitHub</span>
                    </a>
                    {project.live !== '#' && (
                      <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-view-button live-btn">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              <div className="project-info">
                {project.recognition && (
                  <div className="project-recognition">{project.recognition}</div>
                )}
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 6: Contact */}
      <section
        className="contact-section"
        ref={(el) => (sectionsRef.current[6] = el)}
      >
        <div className="contact-container">
          <h2 className="section-title">
            Let's Create
            <span className="gradient-title"> Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Let's bring your vision to life
          </p>

          <form className="contact-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name</label>
                <input type="text" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="your@email.com" />
              </div>
            </div>

            <div className="form-group">
              <label>Project Type</label>
              <select>
                <option>Web Application</option>
                <option>3D Experience</option>
                <option>Blockchain/Web3</option>
                <option>AI/ML Platform</option>
                <option>Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea rows="6" placeholder="Tell me about your project..."></textarea>
            </div>

            <button type="submit" className="submit-button">
              <span>Send Message</span>
              <div className="button-glow"></div>
            </button>
          </form>

          <div className="social-links-container">
            <a href="https://github.com/nabin00012" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/nabin-chapagain-nab12in/" target="_blank" rel="noopener noreferrer" className="social-link">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            {/* Coding Ninjas link removed as requested */}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <p>© 2025 Nabin Chapagain | BTech CS @ Jain University | Built with React, Three.js & ❤️</p>
        <div className="footer-links">
          <a href="https://github.com/nabin00012" target="_blank" rel="noopener noreferrer">GitHub</a>
          <span>•</span>
          <a href="https://www.linkedin.com/in/nabin-chapagain-nab12in/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <span>•</span>
          <a href="/resume-nabin-chapagain.pdf" download>Resume</a>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
