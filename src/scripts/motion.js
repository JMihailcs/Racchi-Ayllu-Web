// Simple inertia scroll engine
export function initMotion() {
  const scrollWrapper = document.querySelector('.scroll-wrapper');
  if (!scrollWrapper) return;

  // We set body to a high height to allow native scrolling, but we fix the visual wrapper
  // and translate it using lerp for smooth inertia.
  let currentScroll = 0;
  let targetScroll = 0;
  const ease = 0.08;

  // We calculate the total height based on the wrapper's real height
  function updateBodyHeight() {
    document.body.style.height = `${scrollWrapper.getBoundingClientRect().height}px`;
  }
  updateBodyHeight();
  window.addEventListener('resize', updateBodyHeight);

  // Sync target with native scroll
  window.addEventListener('scroll', () => {
    targetScroll = window.scrollY;
  });

  // Animation Loop
  function render() {
    currentScroll += (targetScroll - currentScroll) * ease;
    
    // Apply transform to the wrapper
    scrollWrapper.style.transform = `translate3d(0, -${currentScroll}px, 0)`;

    // Calculate progress for specific effects (like parallax or clip-path)
    // You can bind CSS variables to :root or wrapper
    document.documentElement.style.setProperty('--scroll-y', `${currentScroll}px`);
    document.documentElement.style.setProperty('--scroll-progress', `${Math.min(currentScroll / window.innerHeight, 1)}`);
    
    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
