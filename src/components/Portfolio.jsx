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

  // Skills data organized by category - NEW FORMAT
  const skillsData = {
    'Languages & Frameworks': [
      {
        name: 'JavaScript',
        icon: '<svg viewBox="0 0 128 128"><path fill="#F0DB4F" d="M1.408 1.408h125.184v125.185H1.408z"/><path fill="#323330" d="M116.347 96.736c-.917-5.711-4.641-10.508-15.672-14.981-3.832-1.761-8.104-3.022-9.377-5.926-.452-1.69-.512-2.642-.226-3.665.821-3.32 4.784-4.355 7.925-3.403 2.023.678 3.938 2.237 5.093 4.724 5.402-3.498 5.391-3.475 9.163-5.879-1.381-2.141-2.118-3.129-3.022-4.045-3.249-3.629-7.676-5.498-14.756-5.355l-3.688.477c-3.534.893-6.902 2.748-8.877 5.235-5.926 6.724-4.236 18.492 2.975 23.335 7.104 5.332 17.54 6.545 18.873 11.531 1.297 6.104-4.486 8.08-10.234 7.378-4.236-.881-6.592-3.034-9.139-6.949-4.688 2.713-4.688 2.713-9.508 5.485 1.143 2.499 2.344 3.63 4.26 5.795 9.068 9.198 31.76 8.746 35.83-5.176.165-.478 1.261-3.666.38-8.581zM69.462 58.943H57.753l-.048 30.272c0 6.438.333 12.34-.714 14.149-1.713 3.558-6.152 3.117-8.175 2.427-2.059-1.012-3.106-2.451-4.319-4.485-.333-.584-.583-1.036-.667-1.071l-9.52 5.83c1.583 3.249 3.915 6.069 6.902 7.901 4.462 2.678 10.459 3.499 16.731 2.059 4.082-1.189 7.604-3.652 9.448-7.401 2.666-4.915 2.094-10.864 2.07-17.444.06-10.735.001-21.468.001-32.237z"/></svg>',
        color: '#F0DB4F'
      },
      {
        name: 'TypeScript',
        icon: '<svg viewBox="0 0 128 128"><path fill="#007ACC" d="M2 63.91v62.5h125v-125H2zm100.73-5a15.56 15.56 0 017.82 4.5 20.58 20.58 0 013 4c0 .16-5.4 3.81-8.69 5.85-.12.08-.6-.44-1.13-1.23a7.09 7.09 0 00-5.87-3.53c-3.79-.26-6.23 1.73-6.21 5a4.58 4.58 0 00.54 2.34c.83 1.73 2.38 2.76 7.24 4.86 8.95 3.85 12.78 6.39 15.16 10 2.66 4 3.25 10.46 1.45 15.24-2 5.2-6.9 8.73-13.83 9.9a38.32 38.32 0 01-9.52-.1A23 23 0 0180 109.19c-1.15-1.27-3.39-4.58-3.25-4.82a9.34 9.34 0 011.15-.73l4.6-2.64 3.59-2.08.75 1.11a16.78 16.78 0 004.74 4.54c4 2.1 9.46 1.81 12.16-.62a5.43 5.43 0 00.69-6.92c-1-1.39-3-2.56-8.59-5-6.45-2.78-9.23-4.5-11.77-7.24a16.48 16.48 0 01-3.43-6.25 25 25 0 01-.22-8c1.33-6.23 6-10.58 12.82-11.87a31.66 31.66 0 019.49.26zm-29.34 5.24v5.12H56.66v46.23H45.15V69.26H28.88v-5a49.19 49.19 0 01.12-5.17C29.08 59 39 59 51.4 59h21.99z"/></svg>',
        color: '#007ACC'
      },
      {
        name: 'React',
        icon: '<svg viewBox="0 0 128 128"><g fill="#61DAFB"><circle cx="64" cy="64" r="11.4"/><path d="M107.3 45.2c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9 9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8zM92.5 14.7c4.1 2.4 5.5 9.8 3.8 20.3-.3 2.1-.8 4.3-1.4 6.6-5.2-1.2-10.7-2-16.5-2.5-3.4-4.8-6.9-9.1-10.4-13 7.4-7.3 14.9-12.3 21-12.3 1.3 0 2.5.3 3.5.9zM81.3 74c-1.8 3.2-3.9 6.4-6.1 9.6-3.7.3-7.4.4-11.2.4-3.9 0-7.6-.1-11.2-.4-2.2-3.2-4.2-6.4-6-9.6-1.9-3.3-3.7-6.7-5.3-10 1.6-3.3 3.4-6.7 5.3-10 1.8-3.2 3.9-6.4 6.1-9.6 3.7-.3 7.4-.4 11.2-.4 3.9 0 7.6.1 11.2.4 2.2 3.2 4.2 6.4 6 9.6 1.9 3.3 3.7 6.7 5.3 10-1.7 3.3-3.4 6.6-5.3 10zm8.3-3.3c1.5 3.5 2.7 6.9 3.8 10.3-3.4.8-7 1.4-10.8 1.9 1.2-1.9 2.5-3.9 3.6-6 1.2-2.1 2.3-4.2 3.4-6.2zM64 97.8c-2.4-2.6-4.7-5.4-6.9-8.3 2.3.1 4.6.2 6.9.2 2.3 0 4.6-.1 6.9-.2-2.2 2.9-4.5 5.7-6.9 8.3zm-18.6-15c-3.8-.5-7.4-1.1-10.8-1.9 1.1-3.3 2.3-6.8 3.8-10.3 1.1 2 2.2 4.1 3.4 6.1 1.2 2.2 2.4 4.1 3.6 6.1zm-7-25.5c-1.5-3.5-2.7-6.9-3.8-10.3 3.4-.8 7-1.4 10.8-1.9-1.2 1.9-2.5 3.9-3.6 6-1.2 2.1-2.3 4.2-3.4 6.2zM64 30.2c2.4 2.6 4.7 5.4 6.9 8.3-2.3-.1-4.6-.2-6.9-.2-2.3 0-4.6.1-6.9.2 2.2-2.9 4.5-5.7 6.9-8.3zm22.2 21c-1.2-2-2.2-4.1-3.4-6.2-1.2-2.1-2.4-4.1-3.6-6 3.8.5 7.4 1.1 10.8 1.9-1.1 3.3-2.3 6.8-3.8 10.3zm-11.5-31.8c9 8.7 17.9 13.9 24.9 13.9 2.4 0 4.5-.5 6.4-1.6 6.4-3.7 8.7-13 6.6-26.1-.4-2.3-.9-4.7-1.5-7.1 2.4-.7 4.7-1.4 6.9-2.3 12.5-4.8 19.3-11.4 19.3-18.8s-6.8-14-19.3-18.8c-2.2-.8-4.5-1.6-6.9-2.3.6-2.4 1.1-4.8 1.5-7.1 2.1-13.2-.2-22.5-6.6-26.1-1.9-1.1-4-1.6-6.4-1.6-7 0-15.9 5.2-24.9 13.9-9-8.7-17.9-13.9-24.9-13.9-2.4 0-4.5.5-6.4 1.6-6.4 3.7-8.7 13-6.6 26.1.4 2.3.9 4.7 1.5 7.1-2.4.7-4.7 1.4-6.9 2.3C8.2 50 1.4 56.6 1.4 64s6.9 14 19.3 18.8c2.2.8 4.5 1.6 6.9 2.3-.6 2.4-1.1 4.8-1.5 7.1-2.1 13.2.2 22.5 6.6 26.1 1.9 1.1 4 1.6 6.4 1.6 7.1 0 16-5.2 24.9-13.9z"/></g></svg>',
        color: '#61DAFB'
      },
      {
        name: 'Next.js',
        icon: '<svg viewBox="0 0 128 128"><path d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64c11.2 0 21.7-2.9 30.8-7.9L48.4 55.3v36.6h-6.8V41.8h6.8l50.5 75.8C116.4 106.2 128 86.5 128 64c0-35.3-28.7-64-64-64zm22.1 84.6l-7.5-11.3V41.8h7.5v42.8z" fill="#fff"/></svg>',
        color: '#000000'
      },
      {
        name: 'Node.js',
        icon: '<svg viewBox="0 0 128 128"><path fill="#83CD29" d="M112.771 30.334L68.674 4.729c-2.781-1.584-6.402-1.584-9.205 0L14.901 30.334C12.031 31.985 10 35.088 10 38.407v51.142c0 3.319 2.084 6.423 4.954 8.083l11.775 6.688c5.628 2.772 7.617 2.772 10.178 2.772 8.333 0 13.093-5.039 13.093-13.828V42.559c0-.399-.316-.766-.66-.766h-2.956c-.344 0-.66.367-.66.766v50.715c0 3.934-3.957 7.823-10.382 4.527l-12.332-7.104c-.344-.199-.559-.545-.559-.931V38.407c0-.386.215-.732.559-.931l43.803-25.605c.344-.199.773-.199 1.117 0l43.803 25.605c.344.199.559.545.559.931v51.142c0 .386-.215.732-.559.931l-43.803 25.605c-.344.199-.773.199-1.117 0L64 104.546c-.215-.127-.516-.143-.746-.036-.23.107-.416.323-.416.635v2.432c0 .199.108.386.288.489l9.746 5.628c1.383.804 2.916 1.205 4.478 1.205 1.562 0 3.095-.401 4.478-1.205l43.803-25.605c2.87-1.66 4.954-4.764 4.954-8.083V38.407c0-3.319-2.084-6.423-4.954-8.073zM77.91 81.445c-11.726 0-14.309-3.235-15.17-9.066-.1-.628-.633-1.379-1.272-1.379h-3.008c-.639 0-1.272.687-1.272 1.379 0 7.5 4.064 16.536 20.722 16.536 12.243 0 19.69-4.824 19.69-12.858 0-8.034-5.216-10.194-16.169-11.676-11.057-1.482-12.178-2.237-12.178-4.851 0-2.163.861-5.037 8.293-5.037 6.651 0 9.127 1.439 10.178 5.925.117.507.639.931 1.225.931h3.008c.315 0 .617-.147.831-.419.214-.272.316-.639.288-.986-.431-5.099-3.629-7.47-15.53-7.47-8.839 0-14.165 3.735-14.165 9.99 0 8.076 6.232 10.316 15.809 11.307 11.416 1.184 12.537 2.958 12.537 5.271 0 4.091-3.295 5.812-11.015 5.812z"/></svg>',
        color: '#83CD29'
      },
      {
        name: 'Express.js',
        icon: '<svg viewBox="0 0 128 128"><path fill="#fff" d="M126.67 98.44c-4.56 1.16-7.38.05-9.91-3.75-5.68-8.51-11.95-16.63-18-24.9-.78-1.07-1.59-2.12-2.6-3.45C89 76 81.85 85.2 75.14 94.77c-2.4 3.42-4.92 4.91-9.4 3.7l26.92-36.13L67.6 29.71c4.31-.84 7.29-.41 9.93 3.45 5.83 8.52 12.26 16.63 18.67 25.21 6.45-8.55 12.8-16.67 18.8-25.11 2.41-3.42 5-4.72 9.33-3.46-3.28 4.35-6.49 8.63-9.72 12.88-4.36 5.73-8.64 11.53-13.16 17.14-1.61 2-1.35 3.3.09 5.19C109.9 76 118.16 87.1 126.67 98.44zM1.33 61.74c.72-3.61 1.2-7.29 2.2-10.83 6-21.43 30.6-30.34 47.5-17.06C60.93 41.64 63.39 52.62 62.9 65H7.1c-.84 22.21 15.15 35.62 35.53 28.78 7.15-2.4 11.36-8 13.47-15 1.07-3.51 2.84-4.06 6.14-3.06-1.69 8.76-5.52 16.08-13.52 20.66-12 6.86-29.13 4.64-38.14-4.89C5.26 85.89 3 78.92 2 71.39c-.15-1.2-.46-2.38-.7-3.57q.03-3.04.03-6.08zm5.87-1.49h50.43c-.33-16.06-10.33-27.47-24-27.57-15-.12-25.78 11.02-26.43 27.57z"/></svg>',
        color: '#000000'
      },
      {
        name: 'HTML5',
        icon: '<svg viewBox="0 0 128 128"><path fill="#E44D26" d="M19.037 113.876L9.032 1.661h109.936l-10.016 112.198-45.019 12.48z"/><path fill="#F16529" d="M64 116.8l36.378-10.086 8.559-95.878H64z"/><path fill="#EBEBEB" d="M64 52.455H45.788L44.53 38.361H64V24.599H29.489l.33 3.692 3.382 37.927H64zm0 35.743l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#fff" d="M63.952 52.455v13.763h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.696h-3.708zm0-27.856v13.762h33.244l.276-3.092.628-6.978.329-3.692z"/></svg>',
        color: '#E44D26'
      },
      {
        name: 'CSS3',
        icon: '<svg viewBox="0 0 128 128"><path fill="#1572B6" d="M19.67 26l8.069 90.493 36.206 10.05 36.307-10.063L108.33 26z"/><path fill="#33A9DC" d="M64 28.063v91.663l29.381-8.144 8.106-83.52z"/><path fill="#fff" d="M64 52.865H45.788L44.53 38.771h19.47V25.012H28.763l.33 3.692 3.382 37.927H64zm0 35.744l-.061.017-15.327-4.14-.979-10.975H33.816l1.928 21.609 28.193 7.826.063-.017z"/><path fill="#EBEBEB" d="M63.952 52.865v13.759h16.947l-1.597 17.849-15.35 4.143v14.319l28.215-7.82.207-2.325 3.234-36.233.335-3.692h-3.708zm0-27.853v13.759h32.611l.276-3.092.628-6.978.329-3.692z"/></svg>',
        color: '#1572B6'
      },
      {
        name: 'Tailwind CSS',
        icon: '<svg viewBox="0 0 128 128"><path fill="#06B6D4" d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597 6.398-8.531 13.867-11.73 22.398-9.597 4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602-6.399 8.536-13.867 11.735-22.399 9.602-4.87-1.215-8.347-4.746-12.207-8.66-6.27-6.367-13.53-13.738-29.394-13.738zM32.004 64c-17.066 0-27.73 8.531-32 25.602C6.402 81.066 13.87 77.867 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66 6.274 6.367 13.536 13.738 29.395 13.738 17.066 0 27.73-8.53 32-25.597-6.399 8.531-13.867 11.73-22.399 9.597-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64zm0 0"/></svg>',
        color: '#06B6D4'
      },
      {
        name: 'Solidity',
        icon: '<svg viewBox="0 0 128 128"><path fill="#363636" d="M87.5 31.3L75.9 52.5h22.8L87.5 31.3z"/><path opacity=".45" fill="#363636" d="M87.5 31.3L75.9 52.5h22.8L87.5 31.3z"/><path fill="#363636" d="M75.9 52.5L64.3 73.7h22.8L75.9 52.5z"/><path opacity=".6" fill="#363636" d="M75.9 52.5L64.3 73.7h22.8L75.9 52.5z"/><path fill="#363636" d="M64.3 73.7L52.7 94.9h22.8L64.3 73.7z"/><path opacity=".45" fill="#363636" d="M64.3 73.7L52.7 94.9h22.8L64.3 73.7z"/><path fill="#363636" d="M40.5 31.3L28.9 52.5h22.8L40.5 31.3z"/><path opacity=".8" fill="#fff" d="M40.5 31.3L28.9 52.5h22.8L40.5 31.3z"/><path fill="#363636" d="M28.9 52.5L17.3 73.7h22.8L28.9 52.5z"/><path opacity=".45" fill="#fff" d="M28.9 52.5L17.3 73.7h22.8L28.9 52.5z"/><path fill="#363636" d="M17.3 73.7L5.7 94.9h22.8L17.3 73.7z"/><path opacity=".8" fill="#fff" d="M17.3 73.7L5.7 94.9h22.8L17.3 73.7z"/></svg>',
        color: '#363636'
      },
      {
        name: 'Web3',
        icon: '<svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="64" fill="#FF6B00"/><path fill="#fff" d="M89.6 45.2L64 32.3 38.4 45.2v25.6l25.6 12.9 25.6-12.9V45.2zm-51.2 6.4l25.6-12.9 25.6 12.9-25.6 12.9-25.6-12.9zm0 19.2l25.6 12.9 25.6-12.9-25.6-12.9-25.6 12.9z"/></svg>',
        color: '#FF6B00'
      }
    ],
    'Databases & APIs': [
      {
        name: 'MongoDB',
        icon: '<svg viewBox="0 0 128 128"><path fill="#47A248" d="M88.038 42.812c1.605 4.643 2.761 9.383 3.141 14.296.472 6.095.256 12.147-1.029 18.142-.035.165-.109.32-.164.48-.403.001-.814-.049-1.208.012-3.329.523-6.655 1.065-9.981 1.604-3.438.557-6.881 1.092-10.313 1.687-1.216.21-2.721-.041-3.212 1.641-.014.046-.154.054-.235.08l.166-10.051c-.057-8.084-.113-16.168-.169-24.252l1.602-.275c2.62-.429 5.24-.864 7.862-1.281 3.129-.497 6.261-.98 9.392-1.465 1.381-.215 2.764-.412 4.148-.618z"/><path fill="#47A248" d="M61.729 110.054c-1.69-1.453-3.439-2.842-5.059-4.37-8.717-8.222-15.093-17.899-18.233-29.566-.865-3.211-1.442-6.474-1.627-9.792-.13-2.322-.318-4.665-.154-6.975.437-6.144 1.325-12.229 3.127-18.147l.099-.138c.175.233.427.439.516.702 1.759 5.18 3.505 10.364 5.242 15.551 5.458 16.3 10.909 32.604 16.376 48.9.107.318.384.579.583.866l-.87 2.969z"/><path fill="#47A248" d="M88.038 42.812c-1.384.206-2.768.403-4.149.618-3.131.485-6.263.968-9.392 1.465-2.622.417-5.242.852-7.862 1.281l-1.602.275-.012-1.045c-.053-4.905-.095-9.81-.123-14.715-.014-2.386.114-4.769.259-7.15.146-2.407.502-4.795.908-7.171.008-.042.044-.081.076-.128.141.042.317.064.422.146 1.235.971 2.466 1.956 3.695 2.935 8.771 6.983 16.781 14.647 23.13 23.688l.09.112c-.093.104-.18.211-.264.319-1.366 1.65-2.729 3.304-4.09 4.958-.488.593-.98 1.182-1.478 1.777-.042.05-.12.086-.18.129l-.428-.489z"/></svg>',
        color: '#47A248'
      },
      {
        name: 'RESTful APIs',
        icon: '<svg viewBox="0 0 128 128"><path fill="#E535AB" d="M64.083 64.03c-11.37 0-20.588-9.218-20.588-20.588 0-11.37 9.218-20.588 20.588-20.588s20.588 9.218 20.588 20.588c0 11.37-9.218 20.588-20.588 20.588zm0-37.176c-9.144 0-16.588 7.443-16.588 16.588s7.444 16.588 16.588 16.588 16.588-7.443 16.588-16.588-7.444-16.588-16.588-16.588z"/><path fill="#E535AB" d="M27.2 105.165c-2.833 0-5.62-1.083-7.756-3.218-4.273-4.273-4.273-11.238 0-15.511l30.088-30.088c1.163-1.163 3.047-1.163 4.21 0s1.163 3.047 0 4.21L23.655 90.646c-2.053 2.053-2.053 5.392 0 7.445 2.053 2.053 5.392 2.053 7.445 0l30.088-30.088c1.163-1.163 3.047-1.163 4.21 0s1.163 3.047 0 4.21L35.31 102.301c-2.135 2.135-4.922 3.218-7.755 3.218z"/></svg>',
        color: '#E535AB'
      }
    ],
    'Tools & Platforms': [
      {
        name: 'Git',
        icon: '<svg viewBox="0 0 128 128"><path fill="#F05032" d="M124.737 58.378L69.621 3.264c-3.172-3.174-8.32-3.174-11.497 0L46.68 14.71l14.518 14.518c3.375-1.139 7.243-.375 9.932 2.314 2.703 2.706 3.461 6.607 2.294 9.993l13.992 13.993c3.385-1.167 7.292-.413 9.994 2.295 3.78 3.777 3.78 9.9 0 13.679a9.673 9.673 0 01-13.683 0 9.677 9.677 0 01-2.105-10.521L68.574 47.933l-.002 34.341a9.708 9.708 0 012.559 1.828c3.778 3.777 3.778 9.898 0 13.683-3.779 3.777-9.904 3.777-13.679 0-3.778-3.784-3.778-9.905 0-13.683a9.65 9.65 0 013.167-2.11V47.333a9.581 9.581 0 01-3.167-2.111c-2.862-2.86-3.551-7.06-2.083-10.576L41.056 20.333 3.264 58.123a8.133 8.133 0 000 11.5l55.117 55.114c3.174 3.174 8.32 3.174 11.499 0l54.858-54.858a8.135 8.135 0 00-.001-11.501z"/></svg>',
        color: '#F05032'
      },
      {
        name: 'GitHub',
        icon: '<svg viewBox="0 0 128 128"><g fill="#fff"><path fill-rule="evenodd" clip-rule="evenodd" d="M64 1.512c-23.493 0-42.545 19.047-42.545 42.545 0 18.797 12.19 34.745 29.095 40.37 2.126.394 2.907-.923 2.907-2.047 0-1.014-.04-4.366-.058-7.92-11.837 2.573-14.334-5.02-14.334-5.02-1.935-4.918-4.724-6.226-4.724-6.226-3.86-2.64.29-2.586.29-2.586 4.273.3 6.523 4.385 6.523 4.385 3.794 6.504 9.953 4.623 12.38 3.536.383-2.75 1.485-4.628 2.702-5.69-9.45-1.075-19.384-4.724-19.384-21.026 0-4.645 1.662-8.44 4.384-11.42-.442-1.072-1.898-5.4.412-11.26 0 0 3.572-1.142 11.7 4.363 3.395-.943 7.035-1.416 10.65-1.432 3.616.017 7.258.49 10.658 1.432 8.12-5.504 11.688-4.362 11.688-4.362 2.316 5.86.86 10.187.418 11.26 2.728 2.978 4.378 6.774 4.378 11.42 0 16.34-9.953 19.938-19.427 20.99 1.526 1.32 2.886 3.91 2.886 7.882 0 5.696-.05 10.288-.05 11.677 0 1.13.766 2.458 2.922 2.04 16.896-5.632 29.07-21.574 29.07-40.365C106.545 20.56 87.497 1.512 64 1.512z"/><path d="M37.57 62.596c-.095.212-.428.275-.73.13-.31-.14-.482-.427-.382-.64.09-.216.424-.277.733-.132.31.14.486.43.38.642zm-.524-.388M39.293 64.52c-.203.187-.6.1-.87-.198-.278-.297-.33-.694-.124-.884.208-.188.593-.1.87.197.28.3.335.693.124.884zm-.406-.437M40.97 66.968c-.26.182-.687.012-.95-.367-.262-.377-.262-.83.005-1.013.264-.182.684-.018.95.357.262.385.262.84-.005 1.023zm0 0M43.268 69.336c-.233.257-.73.188-1.093-.163-.372-.343-.475-.83-.242-1.087.237-.257.736-.185 1.102.163.37.342.482.83.233 1.087zm0 0M46.44 70.71c-.104.334-.582.485-1.064.344-.482-.146-.796-.536-.7-.872.1-.336.582-.493 1.067-.342.48.144.795.53.696.87zm0 0M49.92 70.965c.013.35-.396.642-.902.648-.508.012-.92-.272-.926-.618 0-.354.4-.642.908-.65.506-.01.92.272.92.62zm0 0M53.16 70.414c.06.342-.29.694-.793.787-.494.092-.95-.12-1.014-.46-.06-.35.297-.7.79-.792.503-.088.953.118 1.017.465zm0 0"/></g></svg>',
        color: '#000000'
      },
      {
        name: 'Vercel',
        icon: '<svg viewBox="0 0 128 128"><path fill="#fff" d="M64 0L128 111.4H0L64 0z"/></svg>',
        color: '#000000'
      },
      {
        name: 'Netlify',
        icon: '<svg viewBox="0 0 128 128"><g fill="#25C7B7"><path d="M52.896 59.473l-.001.002-2.035 2.034-11.242-11.242 2.035-2.034c.264-.264.577-.459.925-.578l13.318 13.318c-.119.348-.314.661-.578.925l-.422-.425zM62.567 69.144l-2.428 2.428-13.318-13.318 2.428-2.428 13.318 13.318z"/><path d="M77.83 54.858c-.742-.742-1.931-.742-2.673 0L63.636 66.379l-4.249-4.249L70.909 50.609c.742-.742.742-1.931 0-2.673l-1.336-1.336c-.742-.742-1.931-.742-2.673 0L55.378 57.121l-4.249-4.249L62.651 41.35c.742-.742.742-1.931 0-2.673l-1.336-1.336c-.742-.742-1.931-.742-2.673 0L47.12 48.863l-4.249-4.249L54.393 33.092c.742-.742.742-1.931 0-2.673l-1.336-1.336c-.742-.742-1.931-.742-2.673 0L38.862 40.605l-3.178-3.178c-.742-.742-1.931-.742-2.673 0l-1.336 1.336c-.742.742-.742 1.931 0 2.673l3.178 3.178-11.522 11.522c-.742.742-.742 1.931 0 2.673l1.336 1.336c.742.742 1.931.742 2.673 0l11.522-11.522 4.249 4.249-11.522 11.522c-.742.742-.742 1.931 0 2.673l1.336 1.336c.742.742 1.931.742 2.673 0l11.522-11.522 4.249 4.249-11.522 11.522c-.742.742-.742 1.931 0 2.673l1.336 1.336c.742.742 1.931.742 2.673 0l11.522-11.522 4.249 4.249-11.522 11.522c-.742.742-.742 1.931 0 2.673l1.336 1.336c.742.742 1.931.742 2.673 0l11.522-11.522 3.178 3.178c.742.742 1.931.742 2.673 0l1.336-1.336c.742-.742.742-1.931 0-2.673l-3.178-3.178L77.83 58.194c.742-.742.742-1.931 0-2.673l-1.336-1.336-.001.001z"/></g></svg>',
        color: '#25C7B7'
      },
      {
        name: 'Postman',
        icon: '<svg viewBox="0 0 128 128"><path fill="#FF6C37" d="M105.721 13.183c-2.892-2.893-7.593-2.893-10.486 0l-48.15 48.15c-1.447 1.447-1.447 3.794 0 5.24 1.447 1.448 3.793 1.448 5.24 0l48.15-48.15c2.893-2.892 2.893-7.593.246-5.24z"/><path fill="#FF6C37" d="M66.435 51.088L19.284 98.239c-2.893 2.893-2.893 7.594 0 10.487 2.893 2.893 7.594 2.893 10.487 0l47.151-47.151c1.447-1.447 1.447-3.794 0-5.241-1.447-1.447-3.794-1.447-5.241 0l-5.246 5.246zM109.515 13.183c-2.893-2.893-7.594-2.893-10.487 0l-8.78 8.78 13.733 13.733 8.78-8.78c2.893-2.893 2.893-7.594-.246-13.733z"/></svg>',
        color: '#FF6C37'
      },
      {
        name: 'VS Code',
        icon: '<svg viewBox="0 0 128 128"><path fill="#0065A9" d="M95.953 3.293l-31.11 28.52-23.897-18.57c-1.645-1.28-3.953-1.248-5.58.076L4.285 37.41c-2.164 1.763-2.164 4.97 0 6.734l12.336 10.06-12.336 10.06c-2.164 1.764-2.164 4.971 0 6.734l31.08 25.092c1.628 1.324 3.936 1.356 5.58.076l23.898-18.57 31.11 28.52c2.797 2.565 7.281 1.495 8.722-2.084l15.818-39.275c1.44-3.58 1.44-7.622 0-11.202L104.675 13.278c-1.44-3.58-5.925-4.65-8.722-2.085z"/></svg>',
        color: '#007ACC'
      },
      {
        name: 'Docker',
        icon: '<svg viewBox="0 0 128 128"><path fill="#2496ED" d="M124.8 52.1c-4.3-2.5-10-2.8-14.8-1.4-.6-5.2-4-9.7-8-12.9l-1.6-1.3-1.4 1.6c-2.7 3.1-3.5 8.3-3.1 12.4.3 2.9 1.2 5.9 3 8.3-1.4.8-2.9 1.9-4.3 2.4-2.8 1-5.9 2-8.9 2H79V49H66V24H51v12H26v13H13v14H1.8l.2 1.5c.5 6.4 3.1 12 7.7 16.8 5.2 5.4 12.8 8 23.6 8 16.6 0 29.5-7.2 35.8-19.8 7.6.1 15.2-1.9 19.8-5.8 2.4 1.7 5.8 2.8 9.4 2.8 2.7 0 5.8-.6 8.7-2.1l1.8-1.1-1-1.8c-1.1-2-1.9-4.2-2.3-6.4 3.8-2.6 6.2-6.3 6.2-10.9.1-3.7-1.8-7.3-5.3-9.6zM85 52h9v10h-9zm0-12h9v10h-9zm-13 12h9v10h-9zm0-12h9v10h-9zm-13 12h9v10h-9zm0-12h9v10h-9zm0-12h9v10h-9zM46 52h9v10h-9zm0-12h9v10h-9zm-13 0h9v10h-9zm-13 12h9v10h-9z"/></svg>',
        color: '#2496ED'
      },
      {
        name: 'Supabase',
        icon: '<svg viewBox="0 0 128 128"><path fill="#3ECF8E" d="M73.7 127.2c-3.1 2.2-7.4.5-8.1-3.1L54 69.8h51.2c4.6 0 7.3 5.3 4.6 9L73.7 127.2z"/><path fill="#3ECF8E" opacity=".6" d="M54.3.8c3.1-2.2 7.4-.5 8.1 3.1L74 58.2H22.8c-4.6 0-7.3-5.3-4.6-9L54.3.8z"/></svg>',
        color: '#3ECF8E'
      },
      {
        name: 'AWS',
        icon: '<svg viewBox="0 0 128 128"><path fill="#FF9900" d="M38.089 77.466l-11.4 4.313s-2.54-.427-3.464-2.114c-.924-1.687.64-3.54 2.114-4.16 1.473-.618 4.627-1.213 7.668-.515 3.04.698 5.082 2.476 5.082 2.476zm21.831-1.258l-15.494 5.837s-2.848-.855-3.928-2.827c-1.08-1.974.77-3.927 2.544-4.72 1.774-.794 5.405-1.458 9.03-.618 3.624.84 7.848 2.328 7.848 2.328zm-10.928-9.93l-13.395 5.043s-2.456-.823-3.387-2.667c-.932-1.845.666-3.726 2.205-4.472 1.538-.745 4.697-1.375 7.842-.574 3.145.8 6.735 2.67 6.735 2.67zM70.054 58.2L50.78 64.5s-3.395-1.02-4.657-3.363c-1.262-2.343.947-4.636 2.727-5.484 1.78-.848 5.637-1.62 10.12-.742 4.482.878 11.084 3.288 11.084 3.288zM16.477 16.388l.08-.021s2.004 2.367 3.457 4.815c1.454 2.448 2.664 5.373 2.664 5.373s-2.987-1.773-5.69-4.263c-2.702-2.49-3.58-4.562-3.58-4.562l3.069-1.342zm1.003 8.316l-.068.021s1.704 2.878 2.874 5.69c1.17 2.81 2.005 5.96 2.005 5.96s-3.217-2.25-5.974-5.374c-2.757-3.125-3.38-5.242-3.38-5.242l4.543-1.055zm6.482 50.817l-.078.033s-2.054-2.48-3.553-5.033c-1.5-2.553-2.776-5.661-2.776-5.661s3.106 1.918 5.916 4.498c2.81 2.58 3.668 4.75 3.668 4.75l-3.177 1.413zm21.308-54.876L25.328 27.08s-2.124-2.787-3.096-5.543c-.971-2.757-1.18-5.957-1.18-5.957s3.75 1.608 6.805 4.195c3.056 2.588 4.213 4.654 4.213 4.654l10.2-6.547zM65.657 20.822l-20.214 7.614s-2.656-3.488-3.879-7.035c-1.223-3.548-1.478-7.483-1.478-7.483s4.71 2.018 8.546 5.267c3.836 3.25 5.286 5.845 5.286 5.845l11.739-4.208zm8.874 22.344l-22.684 8.545s-3.006-3.944-4.386-7.954c-1.38-4.01-1.67-8.463-1.67-8.463s5.323 2.284 9.66 5.958c4.337 3.674 5.975 6.61 5.975 6.61l13.105-4.696zM128 70.258s-1.82.773-4.344 1.447c-2.524.674-5.535 1.216-9.154 1.46-7.238.488-17.046-.524-27.968-4.205C76.616 65.38 67.653 61.24 58.955 56.8c-8.698-4.44-17.655-9.406-24.42-14.552C27.77 37.1 22.518 32.095 19.88 29.01c-2.64-3.085-4.198-5.278-4.198-5.278l1.156-2.489s2.402 2.11 5.432 4.778c3.03 2.668 6.97 5.92 11.844 9.37 4.874 3.45 10.703 7.076 16.95 10.545 12.493 6.938 28.07 13.423 42.667 17.117 7.298 1.848 14.38 3.053 20.697 3.407 3.158.177 6.135.156 8.753-.074 1.31-.115 2.53-.273 3.617-.478 1.087-.204 2.04-.447 2.826-.707 1.573-.52 2.376-1.006 2.376-1.006V70.26z"/></svg>',
        color: '#FF9900'
      },
      {
        name: 'Railway',
        icon: '<svg viewBox="0 0 128 128"><rect fill="#000" width="128" height="128" rx="20"/><path fill="#fff" d="M64 20L20 64l44 44 44-44-44-44zm0 12l32 32-32 32-32-32 32-32z"/></svg>',
        color: '#000000'
      },
      {
        name: 'Render',
        icon: '<svg viewBox="0 0 128 128"><path fill="#46E3B7" d="M64 0C28.7 0 0 28.7 0 64s28.7 64 64 64 64-28.7 64-64S99.3 0 64 0zm32.5 89.3L64 108.8 31.5 89.3V38.7L64 19.2l32.5 19.5v51.6z"/><path fill="#46E3B7" d="M64 32L40 46v28l24 14 24-14V46L64 32zm0 8l16 9.6v19.2L64 78.4 48 68.8V49.6L64 40z"/></svg>',
        color: '#46E3B7'
      }
    ],
    'Authentication & Services': [
      {
        name: 'JWT',
        icon: '<svg viewBox="0 0 128 128"><g fill="#fff"><path d="M64 0C28.654 0 0 28.654 0 64c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64C128 28.654 99.346 0 64 0zm0 116.364C34.909 116.364 11.636 93.091 11.636 64S34.909 11.636 64 11.636 116.364 34.909 116.364 64 93.091 116.364 64 116.364z"/><path d="M77.091 64L64 50.909 50.909 64 64 77.091 77.091 64z"/></g></svg>',
        color: '#000000'
      },
      {
        name: 'Stripe',
        icon: '<svg viewBox="0 0 128 128"><path fill="#635BFF" d="M49.676 65.61c0-4.169 3.383-6.123 9.109-6.123 8.241 0 18.68 2.484 26.921 6.919V51.009c-8.908-3.516-17.763-4.969-26.921-4.969-22.028 0-36.888 11.517-36.888 30.71 0 29.951 41.235 25.172 41.235 38.091 0 4.969-4.329 6.59-10.388 6.59-8.961 0-20.412-3.649-29.521-8.575v15.863c10.014 4.503 20.118 6.456 29.521 6.456 22.481 0 38.021-11.131 38.021-30.576.027-32.304-41.129-26.528-41.129-39.939z"/></svg>',
        color: '#635BFF'
      }
    ]
  };

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

  // Education data - REAL EDUCATION
  const education = [
    {
      id: 1,
      institution: 'Jain (Deemed-to-be University), Bangalore',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science and Engineering',
      period: 'Sep 2023 - Present',
      grade: '8.4/10 CGPA',
      logo: '/images/jain.png',
      description: 'Currently pursuing a B.Tech in Computer Science, focusing on core programming, data structures, and software engineering principles. I am blending advanced theoretical knowledge with extensive hands-on MERN stack development experience.',
      color: '#FF6B00',
      achievements: [
        'CodeCommons project recognized by Jain University',
        'Focus on Full-Stack Development & DevOps',
        'Active participation in tech communities'
      ]
    },
    {
      id: 2,
      institution: 'Deep Boarding High School, Nepal',
      degree: 'Higher Secondary Education',
      field: 'Science (10+2)',
      period: '2021 - 2023',
      grade: '3.34/4.0 CGPA',
      logo: '/images/deep.png',
      description: 'Completed my higher secondary education in Science, building a strong foundation in core sciences and developing initial analytical and critical thinking skills.',
      color: '#4CAF50'
    },
    {
      id: 3,
      institution: 'Deep Boarding High School, Nepal',
      degree: 'Secondary School Certificate',
      field: 'SLC/SEE',
      period: '2008 - 2021',
      grade: '3.5/4.0 CGPA',
      logo: '/images/deep.png',
      description: 'Successfully achieved my secondary education certificate, demonstrating strong performance across all subjects.',
      color: '#2196F3'
    }
  ];

  return (
    <div className="portfolio-wrapper">
      {/* Three.js 3D Background */}
      <ThreeBackground currentSection={currentSection} />

      {/* Section Progress Indicator */}
      <div className="section-progress">
        {['Hero', 'About', 'Experience', 'Skills', 'Certs', 'Projects', 'Education', 'Contact'].map((label, index) => (
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
          <button onClick={() => scrollToSection(7)} className="nav-item">Contact</button>
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
            Building cool web apps — MERN Stack Developer
          </p>

          <div className="hero-cta">
            <button className="primary-button" onClick={() => scrollToSection(5)}>
              <span>View Selected Work</span>
              <div className="button-glow"></div>
            </button>
            <button className="secondary-button" onClick={() => scrollToSection(7)}>
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
          {/* SUPER CREATIVE Photo - LEFT SIDE, Positioned Higher */}
          <div className="about-photo-wrapper">
            <div className="about-photo-container">
              {/* Animated Hexagon Border */}
              <div className="hexagon-border"></div>

              {/* Orbiting Dots */}
              <div className="orbit-container">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="orbit-dot"
                    style={{ '--orbit-angle': `${i * 45}deg`, '--orbit-delay': `${i * 0.3}s` }}
                  ></div>
                ))}
              </div>

              {/* Photo with Effects */}
              <div className="about-photo-inner">
                <div className="about-photo-glow-1"></div>
                <div className="about-photo-glow-2"></div>
                <img
                  src="/images/nabin.png"
                  alt="Nabin Chapagain"
                  className="about-photo"
                />
                <div className="photo-shine"></div>
              </div>

              {/* CREATIVE Animated SVG Geometric Shapes */}
              <div className="floating-shapes">
                {/* Morphing Triangle with Dash Animation */}
                <div className="float-shape shape-1">
                  <svg viewBox="0 0 100 100" className="shape-svg">
                    <polygon points="50,10 90,90 10,90" fill="none" stroke="#00ff88" strokeWidth="3" strokeDasharray="5 5">
                      <animate attributeName="stroke-dashoffset" from="0" to="20" dur="2s" repeatCount="indefinite" />
                    </polygon>
                  </svg>
                </div>
                {/* Pulsing Circle */}
                <div className="float-shape shape-2">
                  <svg viewBox="0 0 100 100" className="shape-svg">
                    <circle cx="50" cy="50" r="35" fill="none" stroke="#00d4ff" strokeWidth="3">
                      <animate attributeName="r" values="30;38;30" dur="3s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                </div>
                {/* Rotating Square with Dashes */}
                <div className="float-shape shape-3">
                  <svg viewBox="0 0 100 100" className="shape-svg">
                    <rect x="15" y="15" width="70" height="70" fill="none" stroke="#ff0080" strokeWidth="3" strokeDasharray="10 5">
                      <animate attributeName="stroke-dashoffset" from="0" to="30" dur="2.5s" repeatCount="indefinite" />
                    </rect>
                  </svg>
                </div>
                {/* Pentagon with Path Animation */}
                <div className="float-shape shape-4">
                  <svg viewBox="0 0 100 100" className="shape-svg">
                    <polygon points="50,10 90,40 75,85 25,85 10,40" fill="none" stroke="#00d4ff" strokeWidth="3" strokeDasharray="8 4">
                      <animate attributeName="stroke-dashoffset" from="0" to="24" dur="3s" repeatCount="indefinite" />
                    </polygon>
                  </svg>
                </div>
              </div>

              {/* Floating Code Symbols - CREATIVE! */}
              <div className="code-symbols">
                <span className="code-symbol symbol-1">&lt;/&gt;</span>
                <span className="code-symbol symbol-2">{'{}'}</span>
                <span className="code-symbol symbol-3">( )</span>
                <span className="code-symbol symbol-4">[ ]</span>
              </div>
            </div>
          </div>

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

      {/* Section 3: NEW Skills Section - 4 Category Grid */}
      <section
        className="skills-modern-section"
        ref={(el) => (sectionsRef.current[3] = el)}
      >
        <div className="section-header">
          <h2 className="section-title">
            Skills
          </h2>
          <p className="section-subtitle">
            Here are some of my skills, which I have been working on web development
          </p>
        </div>

        <div className="skills-category-grid">
          {Object.entries(skillsData).map(([category, techList], catIndex) => (
            <div
              key={category}
              className="skill-category-card"
              style={{ animationDelay: `${catIndex * 0.15}s` }}
            >
              <div className="category-header">
                <h3 className="category-title">{category}</h3>
              </div>
              <div className="tech-grid">
                {techList.map((tech, techIndex) => (
                  <div
                    key={tech.name}
                    className="tech-badge-item"
                    style={{
                      animationDelay: `${(catIndex * 0.15) + (techIndex * 0.05)}s`
                    }}
                  >
                    <div
                      className="tech-icon"
                      dangerouslySetInnerHTML={{ __html: tech.icon }}
                      style={{ '--tech-color': tech.color }}
                    />
                    <span className="tech-name">{tech.name}</span>
                  </div>
                ))}
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
              <img src="/images/codingninjas-leaderboard.png" alt="Coding Ninjas Leaderboard" className="cert-thumbnail" style={{ objectFit: 'cover', background: '#fff' }} />
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

      {/* Section 6: Education */}
      <section
        className="education-section"
        ref={(el) => (sectionsRef.current[6] = el)}
      >
        <div className="section-header">
          <h2 className="section-title">
            Education
          </h2>
          <p className="section-subtitle">
            My education has been a journey of self-discovery and growth. My educational details are as follows.
          </p>
        </div>

        <div className="education-timeline">
          {education.map((edu, index) => (
            <div
              key={edu.id}
              className="education-card"
              data-index={index}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="education-card-inner">
                {/* Animated Border Gradient */}
                <div className="education-card-border" style={{ '--border-color': edu.color }}></div>

                {/* Floating Particles Effect */}
                <div className="education-particles">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="particle" style={{
                      animationDelay: `${i * 0.3}s`,
                      '--particle-color': edu.color
                    }}></div>
                  ))}
                </div>

                {/* Content */}
                <div className="education-content">
                  {/* Logo Section with Glow */}
                  <div className="education-logo-wrapper">
                    <div className="education-logo-glow" style={{ background: edu.color }}></div>
                    <div className="education-logo-container">
                      <img
                        src={edu.logo}
                        alt={edu.institution}
                        className="education-logo"
                      />
                    </div>
                    {/* Animated Ring */}
                    <svg className="education-ring" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="48"
                        fill="none"
                        stroke={edu.color}
                        strokeWidth="2"
                        strokeDasharray="301.593"
                        className="ring-circle"
                      />
                    </svg>
                  </div>

                  {/* Details Section */}
                  <div className="education-details">
                    <div className="education-header">
                      <h3 className="education-institution">{edu.institution}</h3>
                      <span className="education-period">{edu.period}</span>
                    </div>

                    <div className="education-degree-wrapper">
                      <h4 className="education-degree">{edu.degree}</h4>
                      <p className="education-field">{edu.field}</p>
                    </div>

                    {/* Grade Badge with Animation */}
                    <div className="education-grade-badge" style={{ borderColor: edu.color }}>
                      <div className="grade-icon">🎓</div>
                      <div className="grade-details">
                        <span className="grade-label">Grade</span>
                        <span className="grade-value" style={{ color: edu.color }}>{edu.grade}</span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="education-description">{edu.description}</p>

                    {/* Achievements (if any) */}
                    {edu.achievements && (
                      <div className="education-achievements">
                        <h5 className="achievements-title">Key Highlights:</h5>
                        <ul className="achievements-list">
                          {edu.achievements.map((achievement, idx) => (
                            <li key={idx} className="achievement-item">
                              <div className="achievement-bullet" style={{ background: edu.color }}></div>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                {/* Decorative Corner Elements */}
                <div className="corner-decoration top-left" style={{ borderColor: edu.color }}></div>
                <div className="corner-decoration top-right" style={{ borderColor: edu.color }}></div>
                <div className="corner-decoration bottom-left" style={{ borderColor: edu.color }}></div>
                <div className="corner-decoration bottom-right" style={{ borderColor: edu.color }}></div>
              </div>

              {/* Connecting Line for Timeline */}
              {index < education.length - 1 && (
                <div className="timeline-connector">
                  <div className="connector-line" style={{ background: `linear-gradient(180deg, ${edu.color} 0%, ${education[index + 1].color} 100%)` }}></div>
                  <div className="connector-dot" style={{ background: edu.color }}></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Contact */}
      <section
        className="contact-section"
        ref={(el) => (sectionsRef.current[7] = el)}
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
        <p>© 2025 Nabin Chapagain | Building fast, delightful web experiences — MERN & Web3</p>
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
