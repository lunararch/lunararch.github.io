document.addEventListener('DOMContentLoaded', function() {
    initThreeBackground();
    animate();
    
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);
});

let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;

function initThreeBackground() {
    const container = document.getElementById('hero-background');
    
    if (!container) return;
    
    scene = new THREE.Scene();
    
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 500);
    camera.position.z = 30;
    
    renderer = new THREE.WebGLRenderer({ 
        alpha: true,
        antialias: false,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    
    createParticles();
}

function createParticles() {
    const colors = [
        new THREE.Color('#F8A5C2'), // Pastel Magenta
        new THREE.Color('#C5A3FF'), // Light Purple
        new THREE.Color('#FFD1DC'), // Light Pink
        new THREE.Color('#A5DEF1')  // Light Blue
    ];
    
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
        // Positions
        const x = (Math.random() - 0.5) * 100;
        const y = (Math.random() - 0.5) * 100;
        const z = (Math.random() - 0.5) * 100;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
        
        // Colors
        const color = colors[Math.floor(Math.random() * colors.length)];
        particleColors[i * 3] = color.r;
        particleColors[i * 3 + 1] = color.g;
        particleColors[i * 3 + 2] = color.b;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.7,
        transparent: true,
        opacity: 0.8,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        sizeAttenuation: true
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

function animate() {
    requestAnimationFrame(animate);
    
    if (particles) {
        particles.rotation.x += 0.0003;
        particles.rotation.y += 0.0003;
        
        particles.rotation.x += (mouseY * 0.00005);
        particles.rotation.y += (mouseX * 0.00005);
    }
    
    renderer.render(scene, camera);
}

function onMouseMove(event) {
    mouseX = (event.clientX - window.innerWidth / 2);
    mouseY = (event.clientY - window.innerHeight / 2);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
