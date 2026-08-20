// ======================================================
// 📍 LOCATION 1: CONFIG MANAGER (Single Responsibility)
// ======================================================

const ConfigManager = (() => {

  let config = null;
  let loadError = null;

  async function load() {
    try {
      const response = await fetch("config.json");
      if (!response.ok) {
        throw new Error(
          `Config file not found (${response.status})`
        );
      }
      const loadedConfig =
        await response.json();
      if (!loadedConfig.GEMINI_API_KEY) {
        throw new Error(
          "GEMINI_API_KEY missing in config.json"
        );
      }

      // Make configuration immutable
      config = Object.freeze({
        ...loadedConfig
      });

      console.log(
        "✅ Config loaded successfully"
      );
      return true;
    } catch (error) {
      loadError = error.message;
      console.error(
        "❌ Failed to load config:",
        error
      );
      return false;
    }
  }

  function ensureLoaded() {
    if (!config) {
      throw new Error(
        "Config not loaded. Call ConfigManager.load() first."
      );
    }
  }

  function getGeminiUrl() {
    ensureLoaded();
    return `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${config.GEMINI_API_KEY}`;
  }

  function isReady() {
    return config !== null;
  }

  function getError() {
    return loadError;
  }

  return Object.freeze({
    load,
    getGeminiUrl,
    isReady,
    getError

  });

})();

// Initialize configuration
(async () => {
  const success =
    await ConfigManager.load();

  if (!success) {
    console.error(
      "Failed to initialize configuration:"
    );
    console.error(
      ConfigManager.getError()
    );
  }

})();

// ============================================
// 📍 LOCATION 1.5: CONFIG ERROR UI HANDLER
// ============================================

const ConfigErrorUI = {
  showError(errorMessage) {
    // Remove any existing error messages
    this.hideError();
    
    // Create error banner
    const errorDiv = document.createElement('div');
    errorDiv.className = 'config-error-banner';
    
    let userMessage = '';
    if (errorMessage.includes('not found')) {
      userMessage = '⚠️ Configuration file (config.json) is missing!';
    } else if (errorMessage.includes('GEMINI_API_KEY missing')) {
      userMessage = '⚠️ API key is missing from config.json!';
    } else {
      userMessage = `⚠️ Configuration Error`;
    }
    
    errorDiv.innerHTML = `
      <div class="config-error-content">
        <div class="config-error-text">
          <span class="config-error-icon">⚠️</span>
          <div>
            <div class="config-error-title">${userMessage}</div>
            <div class="config-error-message">${errorMessage}</div>
          </div>
        </div>
        <button onclick="ConfigErrorUI.hideError()" class="config-error-close">✕</button>
      </div>
    `;
    
    document.body.insertBefore(errorDiv, document.body.firstChild);
    
    // Disable generate button
    const generateBtn = document.querySelector('.btn-primary');
    if (generateBtn && generateBtn.textContent.includes('Generate')) {
      generateBtn.disabled = true;
    }
    
    // Add help instructions
    this.showHelpInstructions(errorMessage);
  },
  
  showHelpInstructions(errorMessage) {
    // Remove existing help
    const existingHelp = document.getElementById('config-help');
    if (existingHelp) existingHelp.remove();
    
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const helpDiv = document.createElement('div');
      helpDiv.id = 'config-help';
      helpDiv.className = 'config-help';
      
      helpDiv.innerHTML = `
        <h4 class="config-help-title">🔧 How to fix this:</h4>
        <ol class="config-help-list">
          <li>Create a file named <code class="config-help-code">config.json</code> in the project root folder</li>
          <li>Add your Gemini API key in this format:
            <pre class="config-help-pre"><code>{
  "GEMINI_API_KEY": "YOUR_API_KEY_HERE"
}</code></pre>
          </li>
          <li>Get a free API key from <a href="https://aistudio.google.com/apikey" target="_blank" class="config-help-link">Google AI Studio</a></li>
          <li>After adding the file, <button onclick="location.reload()" class="config-refresh-btn">Refresh Page</button></li>
        </ol>
      `;
      
      heroSection.appendChild(helpDiv);
    }
  },
  
  hideError() {
    const errorBanner = document.querySelector('.config-error-banner');
    if (errorBanner) errorBanner.remove();
    
    const helpDiv = document.getElementById('config-help');
    if (helpDiv) helpDiv.remove();
    
    // Re-enable generate button if config becomes available
    if (ConfigManager.isReady()) {
      const generateBtn = document.querySelector('.btn-primary');
      if (generateBtn) {
        generateBtn.disabled = false;
      }
    }
  }
};

// Initialize configuration with user feedback
(async () => {
  // Show loading indicator
  const loadingDiv = document.createElement('div');
  loadingDiv.className = 'config-loading';
  loadingDiv.innerHTML = '🔄 Loading configuration...';
  document.body.appendChild(loadingDiv);
  
  const success = await ConfigManager.load();
  
  // Remove loading indicator
  const loadingIndicator = document.querySelector('.config-loading');
  if (loadingIndicator) loadingIndicator.remove();
  
  if (!success) {
    const errorMsg = ConfigManager.getError();
    console.error("Failed to initialize configuration:", errorMsg);
    // Show user-friendly error message
    ConfigErrorUI.showError(errorMsg);
  } else {
    console.log("✅ Configuration loaded successfully");
    // Show success message briefly
    const successDiv = document.createElement('div');
    successDiv.className = 'config-success';
    successDiv.innerHTML = '✅ Configuration loaded!';
    document.body.appendChild(successDiv);
    setTimeout(() => successDiv.remove(), 2000);
  }
})();

// ============================================
// 📍 LOCATION 2: DESIGN TEMPLATES
// ============================================

const DESIGN_TEMPLATES = {
  professional: {
    name: "Professional Blue",
    primaryColor: "#1f4788",
    accentColor: "#4a90e2",
    textColor: "#ffffff",
    bgColor: "#1f4788"
  },
  creative: {
    name: "Creative Gradient",
    primaryColor: "#6366f1",
    accentColor: "#ec4899",
    textColor: "#ffffff",
    bgColor: "#6366f1"
  },
  minimal: {
    name: "Minimal White",
    primaryColor: "#ffffff",
    accentColor: "#000000",
    textColor: "#000000",
    bgColor: "#ffffff"
  },
  dark: {
    name: "Dark Modern",
    primaryColor: "#1e293b",
    accentColor: "#6366f1",
    textColor: "#ffffff",
    bgColor: "#1e293b"
  },
  vibrant: {
    name: "Vibrant Colorful",
    primaryColor: "#ff6b6b",
    accentColor: "#ffd93d",
    textColor: "#ffffff",
    bgColor: "#ff6b6b"
  }
};

// ============================================
// 📍 LOCATION 3: GLOBAL STATE
// ============================================

let currentPresentationData = null;
let lastRequestTime = 0;
let currentSlideIndex = 0;
const MIN_REQUEST_INTERVAL = 2000;

// ============================================
// 📍 LOCATION 4: INPUT VALIDATION (Single Responsibility)
// ============================================

const InputValidator = {
  validateTopic(topic) {
    if (!topic || topic.trim().length === 0) {
      return { valid: false, error: "❌ Please enter a topic" };
    }
    return { valid: true };
  },

  validateSlideCount(count) {
    const numCount = parseInt(count);
    if (isNaN(numCount) || numCount < 1 || numCount > 15) {
      return { valid: false, error: "❌ Slides must be between 1 and 15" };
    }
    return { valid: true };
  },

  validateRateLimit(lastTime) {
    const now = Date.now();
    if (now - lastTime < MIN_REQUEST_INTERVAL) {
      return { valid: false, error: "⏳ Please wait 2 seconds before generating again" };
    }
    return { valid: true };
  },

  validateAll() {
    const topic = document.getElementById("topic").value.trim();
    const count = document.getElementById("count").value;

    const topicValidation = this.validateTopic(topic);
    if (!topicValidation.valid) return topicValidation;

    const countValidation = this.validateSlideCount(count);
    if (!countValidation.valid) return countValidation;

    const rateLimitValidation = this.validateRateLimit(lastRequestTime);
    if (!rateLimitValidation.valid) return rateLimitValidation;

    return { valid: true };
  }
};

// ============================================
// 📍 LOCATION 5: INPUT GETTERS (Single Responsibility)
// ============================================

const InputGetter = {
  getTopic() {
    return document.getElementById("topic").value.trim();
  },

  getSlideCount() {
    return parseInt(document.getElementById("count").value) || 10;
  },

  getTemplate() {
    return document.getElementById("template").value || "professional";
  },

  getAll() {
    return {
      topic: this.getTopic(),
      count: this.getSlideCount(),
      template: this.getTemplate()
    };
  }
};

// ============================================
// 📍 LOCATION 6: LOADING STATE (Single Responsibility)
// ============================================

const LoadingState = {
  show(message = "✨ Generating your presentation...") {
    document.body.classList.add("loading");
    document.body.setAttribute("data-loading-text", message);
  },

  hide() {
    document.body.classList.remove("loading");
  },

  isLoading() {
    return document.body.classList.contains("loading");
  }
};

// ============================================
// 📍 LOCATION 7: ERROR HANDLER (Single Responsibility)
// ============================================

const ErrorHandler = {
  handle(error, context = "") {
    console.error(`❌ Error in ${context}:`, error);
    
    const message = this.getErrorMessage(error);
    alert(message);
    
    return {
      success: false,
      error: message,
      context
    };
  },

  getErrorMessage(error) {
    if (typeof error === "string") return error;

    if (error.message) {
      if (error.message.includes("429")) {
        return "API rate limited. Please wait 1 minute and try again.";
      }
      if (error.message.includes("401")) {
        return "Invalid API key. Please check your configuration.";
      }
      if (error.message.includes("400")) {
        return "Bad request. Please check your input.";
      }
      return error.message;
    }

    return "An unexpected error occurred. Please try again.";
  },

  async handleAsync(asyncFn, context = "") {
    try {
      return await asyncFn();
    } catch (error) {
      return this.handle(error, context);
    }
  }
};

// ============================================
// 📍 LOCATION 8: GEMINI API CLIENT (Single Responsibility)
// ============================================
const response = await fetch("/.netlify/functions/generate-slides", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ topic, count })
});

const data = await response.json();

if (!response.ok) {
  throw new Error(data.error || `API Error ${response.status}`);
}

return data.text;
// const GeminiClient = {
//   async generateContent(topic, count) {
//     if (!ConfigManager.isReady()) {
//       throw new Error("Configuration not loaded");
//     }

//     const prompt = this.buildPrompt(topic, count);
//     const url = ConfigManager.getGeminiUrl();

//     const response = await fetch(url, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         contents: [{ parts: [{ text: prompt }] }]
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`API Error ${response.status}`);
//     }

//     const data = await response.json();
//     return this.extractText(data);
//   },

//   buildPrompt(topic, count) {
//     return `Create exactly ${count} presentation slides about "${topic}".

// RULES:
// - Each slide must have a short title
// - Each slide must have exactly 3 bullet points
// - Keep bullet points concise (5-10 words each)
// - Format strictly as shown below

// FORMAT:

// Slide 1: Title Here
// - bullet point one
// - bullet point two
// - bullet point three

// Slide 2: Another Title
// - bullet point one
// - bullet point two
// - bullet point three

// Continue this format for all ${count} slides.`;
//   },

//   extractText(data) {
//     const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
//     if (!text) {
//       throw new Error("No content received from API");
//     }
//     return text;
//   }
// };

// ============================================
// 📍 LOCATION 9: SLIDE PARSER (Single Responsibility)
// ============================================

const SlideParser = {
  parse(text) {
    const slides = [];
    const slideTexts = text.split(/Slide\s+\d+:\s*/i).filter(s => s.trim());

    slideTexts.forEach((slide, index) => {
      const parsedSlide = this.parseSlide(slide, index);
      if (parsedSlide) slides.push(parsedSlide);
    });

    return slides;
  },

  parseSlide(slideText, index) {
    const lines = slideText.split("\n").filter(line => line.trim());
    if (lines.length === 0) return null;

    const title = lines[0]?.replace(/[:\-]/g, "").trim() || `Slide ${index + 1}`;
    const bullets = this.parseBullets(lines.slice(1));

    return {
      id: `slide-${index}`,
      title,
      bullets,
      order: index
    };
  },

  parseBullets(lines) {
    const bullets = lines
      .map(line => line.replace(/^[-•]\s*/, "").trim())
      .filter(b => b)
      .slice(0, 3);

    while (bullets.length < 3) {
      bullets.push("");
    }

    return bullets;
  }
};

// ============================================
// 📍 LOCATION 10: PRESENTATION BUILDER (Single Responsibility)
// ============================================

const PresentationBuilder = {
  create(topic, slides, template) {
    const design = DESIGN_TEMPLATES[template];

    return {
      id: `pres-${Date.now()}`,
      title: `${topic} - BrightSlides`,
      topic,
      template,
      design,
      slides,
      createdAt: new Date().toISOString(),
      slideCount: slides.length
    };
  }
};

// ============================================
// 📍 LOCATION 11: MAIN GENERATION FUNCTION 
// ============================================

async function generateSlides() {
  // CHECK CONFIG FIRST
  if (!ConfigManager.isReady()) {
    const errorMsg = ConfigManager.getError() || "Configuration not loaded";
    alert(`⚠️ Cannot generate slides: ${errorMsg}\n\nPlease fix the configuration issue and refresh the page.`);
    return;
  }
  
  // Step 1: Validate all inputs
  const validation = InputValidator.validateAll();
  if (!validation.valid) {
    alert(validation.error);
    return;
  }

  // Step 2: Update rate limit
  lastRequestTime = Date.now();

  // Step 3: Get inputs
  const { topic, count, template } = InputGetter.getAll();

  // Step 4: Show loading
  LoadingState.show();

  try {
    // Step 5: Generate with Gemini
    console.log("📝 Generating content...");
    const text = await GeminiClient.generateContent(topic, count);

    // Step 6: Parse slides
    console.log("✏️ Parsing slides...");
    const slides = SlideParser.parse(text);

    // Step 7: Build presentation
    console.log("📊 Building presentation...");
    const presentation = PresentationBuilder.create(topic, slides, template);

    // Step 8: Store and display
    currentPresentationData = presentation;
    displaySlideEditor(presentation, template);
    console.log("✅ Success!");

  } catch (error) {
    ErrorHandler.handle(error, "generateSlides");
  } finally {
    LoadingState.hide();
  }
}

// ============================================
// 📍 LOCATION 12: SLIDE EDITOR DISPLAY 
// ============================================

function displaySlideEditor(presentationData, template) {
  const design = DESIGN_TEMPLATES[template];
  const resultDiv = document.getElementById("result");

  let html = `
    <div class="editor-container">
      <div class="editor-header">
        <h3>✏️ Edit Your Presentation</h3>
        <p><strong>${presentationData.title}</strong> • ${presentationData.slideCount} slides</p>
      </div>

      <div class="slides-editor-wrapper">
        <div class="slides-editor">
  `;

  presentationData.slides.forEach((slide, index) => {
    html += createEditableSlideHTML(slide, index, design);
  });

  html += `
        </div>
    </div>

      <div class="editor-actions">
        <button onclick="addNewSlide()" class="btn-secondary">
          ➕ Add Slide
        </button>

        <button onclick="savePresentation()" class="btn-primary">
          💾 Save Changes
        </button>

        <button onclick="autoGenerateSlides()" class="btn-primary">
          🤖 Auto-Generate Remaining
        </button>

        <button onclick="startPresentationMode()" class="btn-primary">
          🎥 Present
        </button>

        <button onclick="exportPresentation()" class="btn-primary">
          📥 Export Options
        </button>
      </div>
    </div>
  `;

  resultDiv.innerHTML = html;
  document.getElementById("output").classList.remove("hidden");
}

// ============================================
// 📍 LOCATION 13: CREATE EDITABLE SLIDE HTML
// ============================================

function createEditableSlideHTML(slide, index, design) {
  return `
    <div class="editable-slide" data-slide-id="${slide.id}">
      <div class="slide-number">Slide ${index + 1}</div>
      
      <div class="slide-preview-box" style="border-left: 4px solid ${design.accentColor};">
        <div class="slide-content">
          <input 
            type="text" 
            class="slide-title-input" 
            value="${slide.title}"
            placeholder="Slide Title"
            onchange="updateSlideTitle('${slide.id}', this.value)"
          />
          
          <div class="slide-bullets">
            ${slide.bullets.map((bullet, bulletIndex) => `
              <div class="bullet-item">
                <span class="bullet-marker">•</span>
                <input 
                  type="text" 
                  class="bullet-input"
                  value="${bullet}"
                  placeholder="Bullet point ${bulletIndex + 1}"
                  onchange="updateSlideBullet('${slide.id}', ${bulletIndex}, this.value)"
                />
              </div>
            `).join('')}
          </div>
        </div>
      </div>

      <div class="slide-actions">
        <button onclick="deleteSlide('${slide.id}')" class="btn-delete" title="Delete slide">🗑️ Delete</button>
        <button onclick="duplicateSlide('${slide.id}')" class="btn-duplicate" title="Duplicate slide">📋 Duplicate</button>
      </div>
    </div>
  `;
}

// ============================================
// 📍 LOCATION 14: SLIDE EDITING FUNCTIONS
// ============================================

function updateSlideTitle(slideId, newTitle) {
  if (!currentPresentationData) return;

  const slide = currentPresentationData.slides.find(s => s.id === slideId);
  if (slide) {
    slide.title = newTitle;
    console.log(`✏️ Updated slide title: "${newTitle}"`);
  }
}

function updateSlideBullet(slideId, bulletIndex, newBullet) {
  if (!currentPresentationData) return;

  const slide = currentPresentationData.slides.find(s => s.id === slideId);
  if (slide) {
    slide.bullets[bulletIndex] = newBullet;
    console.log(`✏️ Updated bullet ${bulletIndex + 1}: "${newBullet}"`);
  }
}

function addNewSlide() {
  if (!currentPresentationData) return;

  const newSlide = {
    id: `slide-${Date.now()}`,
    title: "New Slide",
    bullets: ["", "", ""],
    order: currentPresentationData.slides.length
  };

  currentPresentationData.slides.push(newSlide);
  currentPresentationData.slideCount = currentPresentationData.slides.length;
  displaySlideEditor(currentPresentationData, currentPresentationData.template);
  console.log("✅ New slide added");
}

function deleteSlide(slideId) {
  if (!currentPresentationData) return;

  if (currentPresentationData.slides.length === 1) {
    alert("❌ Cannot delete the last slide");
    return;
  }

  if (!confirm("Are you sure you want to delete this slide?")) return;

  currentPresentationData.slides = currentPresentationData.slides.filter(s => s.id !== slideId);
  currentPresentationData.slideCount = currentPresentationData.slides.length;
  displaySlideEditor(currentPresentationData, currentPresentationData.template);
  console.log("🗑️ Slide deleted");
}

function duplicateSlide(slideId) {
  if (!currentPresentationData) return;

  const slideIndex = currentPresentationData.slides.findIndex(s => s.id === slideId);
  if (slideIndex === -1) return;

  const slideToDuplicate = currentPresentationData.slides[slideIndex];
  const newSlide = {
    id: `slide-${Date.now()}`,
    title: `${slideToDuplicate.title} (Copy)`,
    bullets: [...slideToDuplicate.bullets],
    order: currentPresentationData.slides.length
  };

  currentPresentationData.slides.splice(slideIndex + 1, 0, newSlide);
  currentPresentationData.slideCount = currentPresentationData.slides.length;
  displaySlideEditor(currentPresentationData, currentPresentationData.template);
  console.log("📋 Slide duplicated");
}

// ============================================
// 📍 LOCATION 15: AUTO-GENERATE FEATURE 
// ============================================

async function autoGenerateSlides() {
  if (!currentPresentationData) {
    alert("❌ No presentation loaded");
    return;
  }

  const { topic } = currentPresentationData;
  const currentCount = currentPresentationData.slideCount;
  const additionalSlides = 5; // Generate 5 more slides

  LoadingState.show("🤖 Auto-generating additional slides...");

  try {
    const text = await GeminiClient.generateContent(topic, additionalSlides);
    const newSlides = SlideParser.parse(text);

    // Add new slides to presentation
    newSlides.forEach(slide => {
      slide.id = `slide-${Date.now()}-${Math.random()}`;
      slide.order = currentPresentationData.slides.length;
      currentPresentationData.slides.push(slide);
    });

    currentPresentationData.slideCount = currentPresentationData.slides.length;
    displaySlideEditor(currentPresentationData, currentPresentationData.template);
    alert(`✅ Added ${additionalSlides} new slides! Total: ${currentPresentationData.slideCount}`);
    console.log("🤖 Auto-generated slides added");

  } catch (error) {
    ErrorHandler.handle(error, "autoGenerateSlides");
  } finally {
    LoadingState.hide();
  }
}

// ============================================
// 📍 LOCATION 16: SAVE & EXPORT FUNCTIONS
// ============================================

function savePresentation() {
  if (!currentPresentationData) return;

  try {
    localStorage.setItem("brightslides_data", JSON.stringify(currentPresentationData));
    alert("✅ Presentation saved successfully!");
    console.log("💾 Saved to localStorage");
  } catch (error) {
    ErrorHandler.handle(error, "savePresentation");
  }
}

function exportPresentation() {
  if (!currentPresentationData) return;

  const design = currentPresentationData.design;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = `
    <div class="success-message">
      <h3>✅ Export Options</h3>
      <p><strong>Title:</strong> ${currentPresentationData.title}</p>
      <p><strong>Slides:</strong> ${currentPresentationData.slideCount}</p>
      <p><strong>Design:</strong> ${design.name}</p>
      
      <div class="action-buttons">
        <button onclick="startPresentationMode()" class="btn-primary">
          🎥 Present Now
        </button>

        <button onclick="downloadPDF()" class="btn-primary">
          📄 Download PDF
        </button>

        <button onclick="downloadPPTX()" class="btn-primary">
          📊 Download PPTX
        </button>

        <button onclick="openGoogleSlidesWithData()" class="btn-primary">
          ☁ Google Slides
        </button>

        <button onclick="copyToClipboard()" class="btn-secondary">
          📋 Copy Text
        </button>

      </div>
  
      <div class="slide-preview">
        <h4>📋 Slide Preview:</h4>
        ${currentPresentationData.slides.slice(0, 3).map((slide, i) => `
          <div class="preview-slide" style="border-left: 4px solid ${design.accentColor}; padding: 12px; margin: 10px 0; background: #1e293b; border-radius: 6px;">
            <strong style="color: ${design.accentColor};">Slide ${i + 1}: ${slide.title}</strong>
            <ul style="margin: 8px 0; padding-left: 20px; color: #94a3b8; font-size: 13px;">
              ${slide.bullets.map(b => `<li>${b || '(empty)'}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
        ${currentPresentationData.slideCount > 3 ? `<p style="color: #64748b; font-size: 13px; margin-top: 10px;">... and ${currentPresentationData.slideCount - 3} more slides</p>` : ''}
      </div>

      <button onclick="displaySlideEditor(currentPresentationData, currentPresentationData.template)" class="btn-secondary" style="margin-top: 20px;">
        ← Back to Edit
      </button>
    </div>
  `;
}

// ============================================
// 📍 LOCATION 17: EXPORT ACTION FUNCTIONS
// ============================================

// Open Google Slides and paste content
function openGoogleSlidesWithData() {
  if (!currentPresentationData) {
    // Try to load from localStorage if no current data
    const saved = localStorage.getItem("brightslides_data");
    if (!saved) {
      alert("❌ No presentation data found. Please generate a presentation first.");
      return;
    }
    currentPresentationData = JSON.parse(saved);
  }

  const data = currentPresentationData;
  const design = data.design;

  // Create formatted content for Google Slides
  let slidesContent = `${data.title}\n`;
  slidesContent += `${"=".repeat(data.title.length)}\n\n`;
  
  data.slides.forEach((slide, i) => {
    slidesContent += `📊 SLIDE ${i + 1}: ${slide.title}\n`;
    slidesContent += `${"-".repeat(slide.title.length + 12)}\n`;
    slide.bullets.forEach(bullet => {
      if (bullet && bullet.trim()) {
        slidesContent += `• ${bullet}\n`;
      }
    });
    slidesContent += `\n---\n\n`;
  });

  // Copy to clipboard with better formatting
  navigator.clipboard.writeText(slidesContent).then(() => {
    // Show instructions modal instead of just opening Google Slides
    showGoogleSlidesInstructions(design);
  }).catch(err => {
    console.error("Clipboard error:", err);
    // Fallback: show manual instructions
    showGoogleSlidesManualInstructions(slidesContent, design);
  });
}

function showGoogleSlidesInstructions(design) {
  // Create a modal with instructions
  const modal = document.createElement('div');
  modal.className = 'gslides-modal-overlay';
  
  modal.innerHTML = `
    <div class="gslides-modal-container">
      <h3 class="gslides-modal-title">✅ Content Copied!</h3>
      
      <div class="gslides-modal-text">
        <p>Your presentation content has been copied to the clipboard.</p>
      </div>
      
      <div class="gslides-info-box">
        <p class="gslides-info-text"><strong>📋 Steps to create in Google Slides:</strong></p>
        <ol class="gslides-steps">
          <li>Click the button below to open Google Slides</li>
          <li>Click <strong>"Blank"</strong> to create a new presentation</li>
          <li>Press <strong>Ctrl+V</strong> (or Cmd+V on Mac) to paste your content</li>
          <li>Use our design template: <strong class="gslides-template-name">${design.name}</strong></li>
          <li>Primary color: <span class="gslides-primary-color" style="background: ${design.primaryColor};">${design.primaryColor}</span></li>
          <li>Accent color: <span class="gslides-accent-color" style="background: ${design.accentColor};">${design.accentColor}</span></li>
        </ol>
      </div>
      
      <div class="gslides-button-group">
        <button class="gslides-btn-primary" onclick="window.open('https://docs.google.com/presentation', '_blank'); this.closest('.gslides-modal-overlay').remove();">
          🎨 Open Google Slides
        </button>
        
        <button class="gslides-btn-secondary" onclick="this.closest('.gslides-modal-overlay').remove()">
          Close
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Add click outside to close
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.remove();
  });
}

function showGoogleSlidesManualInstructions(content, design) {
  // Fallback for when clipboard doesn't work
  const modal = document.createElement('div');
  modal.className = 'gslides-modal-overlay manual';
  
  modal.innerHTML = `
    <div class="gslides-modal-container manual">
      <h3 class="gslides-modal-title">📋 Copy Manually</h3>
      
      <div class="gslides-modal-text">
        <p>Your browser doesn't support automatic copying. Please copy the content below:</p>
      </div>
      
      <div class="gslides-content-preview">
        <pre class="gslides-pre">${escapeHtml(content)}</pre>
      </div>
      
      <div class="gslides-button-group">
        <button class="gslides-btn-primary" onclick="navigator.clipboard.writeText(${JSON.stringify(content)}).then(() => { alert('Copied!'); this.closest('.gslides-modal-overlay').remove(); })">
          📋 Copy to Clipboard
        </button>
        
        <button class="gslides-btn-secondary" onclick="window.open('https://docs.google.com/presentation', '_blank');">
          🎨 Open Google Slides
        </button>
      </div>
      
      <button class="gslides-btn-danger" onclick="this.closest('.gslides-modal-overlay').remove()">
        Close
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
}

// Helper function to escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// 📍 LOCATION 18: HELPER FUNCTIONS
// ============================================

function closeModal() {
  document.getElementById("output").classList.add("hidden");
  document.getElementById("topic").value = "";
  document.getElementById("count").value = "10";
  currentPresentationData = null;
}

function startPresentationMode() {
  if (!currentPresentationData) return;

  currentSlideIndex = 0;

  const slidesHtml = currentPresentationData.slides.map((slide, index) => `
      <div class="presentation-slide ${index === 0 ? 'active' : ''}">
          <h1>${slide.title}</h1>
          <ul>
              ${slide.bullets.map(b => `<li>${b}</li>`).join("")}
          </ul>
      </div>
  `).join("");

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div id="presentationMode" class="presentation-mode">
        ${slidesHtml}
        <div class="presentation-controls">
            <button onclick="previousSlide()">
              ◀ Previous
            </button>

            <button onclick="nextSlide()">
              Next ▶
            </button>

            <button onclick="exitPresentation()">
              ✖ Exit
            </button>

        </div>

    </div>
    `
  );
}

function nextSlide() {
  const slides =
    document.querySelectorAll(".presentation-slide");
  if (
    currentSlideIndex <
    slides.length - 1
  ) {
    slides[currentSlideIndex]
      .classList.remove("active");

    currentSlideIndex++;

    slides[currentSlideIndex]
      .classList.add("active");
  }
}

function previousSlide() {
  const slides =
    document.querySelectorAll(".presentation-slide");
  if (currentSlideIndex > 0) {
    slides[currentSlideIndex]
      .classList.remove("active");

    currentSlideIndex--;

    slides[currentSlideIndex]
      .classList.add("active");
  }
}

function exitPresentation() {
  const mode =
    document.getElementById("presentationMode");
  if (mode) mode.remove();
}

// function downloadPDF() {
//   alert("PDF export coming next.");
// }

async function downloadPDF() {

  const editor =
    document.querySelector(".slide-editor");

  if (!editor) {
    alert("No presentation to export.");
    return;
  }

  const canvas =
    await html2canvas(editor);

  const imgData =
    canvas.toDataURL("image/png");

  const { jsPDF } = window.jspdf;

  const pdf = new jsPDF(
    "p",
    "mm",
    "a4"
  );

  const pdfWidth =
    pdf.internal.pageSize.getWidth();

  const pdfHeight =
    (canvas.height * pdfWidth)
    / canvas.width;

  pdf.addImage(
    imgData,
    "PNG",
    0,
    0,
    pdfWidth,
    pdfHeight
  );

  pdf.save(
    `${currentPresentationData.title}.pdf`
  );
}

// function downloadPPTX() {
//   alert("PPTX export coming next.");
// }
async function downloadPPTX() {

  if (!currentPresentationData) {
    alert("No presentation available.");
    return;
  }

  const pptx = new PptxGenJS();

  pptx.layout = "LAYOUT_WIDE";

  currentPresentationData.slides.forEach(
    slide => {

      const pptSlide =
        pptx.addSlide();

      pptSlide.addText(
        slide.title,
        {
          x: 0.5,
          y: 0.4,
          w: 9,
          h: 0.6,
          fontSize: 24,
          bold: true
        }
      );

      pptSlide.addText(
        slide.bullets.map(
          b => `• ${b}`
        ).join("\n"),
        {
          x: 0.7,
          y: 1.2,
          w: 8,
          h: 3.5,
          fontSize: 18
        }
      );
    }
  );

  await pptx.writeFile({
    fileName:
      `${currentPresentationData.title}.pptx`
  });
}

document.addEventListener(
  "keydown",
  e => {
    if (
      document.getElementById(
        "presentationMode"
      )
    ) {
      if (e.key === "ArrowRight")
        nextSlide();

      if (e.key === "ArrowLeft")
        previousSlide();

      if (e.key === "Escape")
        exitPresentation();
    }
  }
);

window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("brightslides_data");
  if (saved) {
    console.log("📂 Loaded saved slides from localStorage");
  }
});


