/**
 * Dynamically calculates:
 *   - The browser viewport width/height
 *   - The targeted element's width/height
 *
 * Displays these values in a styled block pinned to the top-center
 * of the page (so it doesn't affect layout). It updates automatically
 * on window resize or element resize (if ResizeObserver is supported).
 *
 * @param {string} [selector='body'] - Tag name or class selector.
 * @param {string} [color='#cccccc']  - Optional color (named or hex) for border/text.
 */
function showElementDimensions(options = {}) {
  // Default function parameters
  const { selector = "body", color = "#989898" } = options;

  // Get the targeted element
  const element = document.querySelector(selector);

  // Create the results container
  const resultsBloc = document.createElement("div");
  resultsBloc.className = "sizing-results-bloc";
  // Position it absolutely on top of everything, at top-center
  resultsBloc.style.position = "fixed";
  resultsBloc.style.top = "10px";
  resultsBloc.style.left = "50%";
  resultsBloc.style.transform = "translateX(-50%)";
  resultsBloc.style.zIndex = "9999";

  // Basic styling
  resultsBloc.style.border = `2px solid ${color}`;
  resultsBloc.style.color = color;
  resultsBloc.style.fontWeight = "bold";
  resultsBloc.style.backgroundColor = "#fff8dc"; // Light "cornsilk" background
  resultsBloc.style.padding = "5px 10px";
  resultsBloc.style.margin = "0";
  resultsBloc.style.display = "inline-block";
  resultsBloc.style.boxShadow = "0 2px 5px rgba(0,0,0,0.2)"; // slight shadow

  // If element is missing, display an error
  if (!element) {
    resultsBloc.textContent = `Element not present for selector: "${selector}"`;
    document.body.appendChild(resultsBloc);
    return;
  }

  // Update function to refresh current dimensions
  function updateDimensions() {
    // Viewport dimensions
    const vpWidth = window.innerWidth;
    const vpHeight = window.innerHeight;

    // Element dimensions (sub-pixel precision)
    const rect = element.getBoundingClientRect();
    const elWidth = rect.width.toFixed(2) + " px";
    const elHeight = rect.height.toFixed(2) + " px";

    // Update display text
    resultsBloc.innerHTML = `
            Viewport => width: ${vpWidth}px | height: ${vpHeight}px
            <br>
            ${selector} => width: ${elWidth} | height: ${elHeight}
          `;
  }

  // Always append to the body, pinned top-center
  document.body.appendChild(resultsBloc);

  // Initial measurement
  updateDimensions();

  // Live updates via ResizeObserver (if supported)
  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(element);
  }

  // Also update on window resize (for real-time viewport changes)
  window.addEventListener("resize", updateDimensions);
}

// ----------------------------------------------------------------------
// EXAMPLE USAGE:

// Wait until the DOM is loaded (best practice if you're not placing script at the very bottom)
document.addEventListener("DOMContentLoaded", () => {
  // 1) Basic usage: measure .maincontent, default color:
  // showElementDimensions({ selector: '.maincontent' });

  // 2) You can measure <body> or any other element:
  // showElementDimensions({ selector: 'body', color: 'blue' });

  // 3) Measure with only color specified, default selector:
  // showElementDimensions({ color: 'green' });

  // 4) Measure with default parameters:
  // showElementDimensions();
  showElementDimensions({ selector: "main" });
});
