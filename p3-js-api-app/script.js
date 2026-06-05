// ============================================
// GEMINI API CONFIG
// ============================================

let config;
let GEMINI_API_URL;

fetch("config.json")
  .then(response => response.json())
  .then(data => {
    config = data;
    GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${config.GEMINI_API_KEY}`;
    console.log("✅ Config loaded successfully");
  })

// ============================================
// DESIGN TEMPLATES (with Google Slides colors)
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

// ================
// GLOBAL STATE 
// ================

let currentPresentationData = null;

// ============================================
// MAIN GENERATION FUNCTION
// ============================================
let lastRequestTime = 0;
const MIN_REQUEST_INTERVAL = 2000;

async function generateSlides() {
  // Step 1: Validate input
  if (!validateInput()) return;

  // Step 2: Check rate limiting
  if (!checkRateLimit()) return;

  // Step 3: Get input values
  const { topic, count, template } = getInputValues();

  // Step 4: Show loading state
  showLoading();

  try {
    // Step 5: Generate content with Gemini
    console.log("📝 Step 1: Generating content with Gemini...");
    const slideContent = await generateGeminiContent(topic, count);

    // Step 6: Create presentation data
    console.log("✏️ Step 2: Creating presentation data...");
    const presentationData = createPresentationData(topic, slideContent, template);

    // Step 7: Store in memory for editing
    currentPresentationData = presentationData;

    // Step 8: Show editor
    console.log("✅ Step 3: Displaying editor...");
    displaySlideEditor(presentationData, template);

  } catch (err) {
    console.error("ERROR:", err);
    alert(`❌ ${err.message}`);
  } finally {
    hideLoading();
  }
}

// ======================
// VALIDATION FUNCTION 
// ======================

function validateInput() {
  const topic = document.getElementById("topic").value.trim();
  const count = parseInt(document.getElementById("count").value) || 10;

  if (!topic) {
    alert("❌ Please enter a topic");
    return false;
  }

  if (count < 1 || count > 15) {
    alert("❌ Slides must be between 1 and 15");
    return false;
  }

  return true;
}

// ======================
// RATE LIMITING CHECK 
// ======================

function checkRateLimit() {
  const now = Date.now();
  if (now - lastRequestTime < MIN_REQUEST_INTERVAL) {
    alert("⏳ Please wait 2 seconds before generating again");
    return false;
  }
  lastRequestTime = now;
  return true;
}

// ========================
// GET INPUT VALUES 
// ========================

function getInputValues() {
  return {
    topic: document.getElementById("topic").value.trim(),
    count: parseInt(document.getElementById("count").value) || 10,
    template: document.getElementById("template").value || "professional"
  };
}

// ===========================
// LOADING STATE FUNCTIONS 
// ===========================

function showLoading() {
  document.body.classList.add("loading");
}

function hideLoading() {
  document.body.classList.remove("loading");
}

// ============================================
// STEP 1: GENERATE CONTENT WITH GEMINI
// ============================================
async function generateGeminiContent(topic, count) {
  const prompt = `Create exactly ${count} presentation slides about "${topic}".

RULES:
- Each slide must have a short title
- Each slide must have exactly 3 bullet points
- Keep bullet points concise (5-10 words each)
- Format strictly as shown below

FORMAT:

Slide 1: Title Here
- bullet point one
- bullet point two
- bullet point three

Slide 2: Another Title
- bullet point one
- bullet point two
- bullet point three

Continue this format for all ${count} slides.`;

  const response = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(getErrorMessage(response.status, data));
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("No content from Gemini API");

  return parseSlides(text);
}

// ==========================
// ERROR MESSAGE HELPER
// ==========================

function getErrorMessage(status, data) {
  const errorMessages = {
    429: "API rate limited (429). Please wait 1 minute and try again.",
    401: "Gemini API key invalid (401).",
    400: `Bad request (400): ${data.error?.message || "Invalid prompt"}`
  };

  return errorMessages[status] || `Gemini Error ${status}: ${data.error?.message || "Unknown error"}`;
}

// ========================
//  PARSE SLIDES HELPER 
// ========================

function parseSlides(text) {
  const slides = [];
  const slideTexts = text.split(/Slide\s+\d+:\s*/i).filter(s => s.trim());

  slideTexts.forEach((slide, index) => {
    const lines = slide.split("\n").filter(line => line.trim());
    const title = lines[0]?.replace(/[:\-]/g, "").trim() || `Slide ${index + 1}`;
    const bullets = lines.slice(1)
      .map(line => line.replace(/^[-•]\s*/, "").trim())
      .filter(b => b)
      .slice(0, 3);

    // Ensure exactly 3 bullets
    while (bullets.length < 3) {
      bullets.push("");
    }

    slides.push({ 
      id: `slide-${index}`,
      title, 
      bullets,
      order: index 
    });
  });

  return slides;
}

// ============================================
// STEP 2: CREATE PRESENTATION DATA
// ============================================
function createPresentationData(topic, slides, template) {
  const design = DESIGN_TEMPLATES[template];
  
  return {
    title: `${topic} - BrightSlides`,
    topic: topic,
    template: template,
    design: design,
    slides: slides,
    createdAt: new Date().toISOString(),
    slideCount: slides.length
  };
}

// =========================
// DISPLAY SLIDE EDITOR 
// =========================

function displaySlideEditor(presentationData, template) {
  const design = DESIGN_TEMPLATES[template];
  const resultDiv = document.getElementById("result");

  let html = `
    <div class="editor-container">
      <div class="editor-header">
        <h3>✏️ Edit Your Presentation</h3>
        <p><strong>${presentationData.title}</strong> • ${presentationData.slideCount} slides</p>
      </div>

      <div class="slides-editor">
  `;

  // Add each slide for editing
  presentationData.slides.forEach((slide, index) => {
    html += createEditableSlideHTML(slide, index, design);
  });

  html += `
      </div>

      <div class="editor-actions">
        <button onclick="addNewSlide()" class="btn-secondary">➕ Add Slide</button>
        <button onclick="savePresentation()" class="btn-primary">💾 Save Changes</button>
        <button onclick="exportPresentation()" class="btn-primary">📥 Export PPTX</button>
      </div>
    </div>
  `;

  resultDiv.innerHTML = html;
  document.getElementById("output").classList.remove("hidden");
}

// ================================
// CREATE EDITABLE SLIDE HTML 
// ================================

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

// =============================
// SLIDE EDITING FUNCTIONS 
// =============================

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

  // Re-render editor
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

  // Re-render editor
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

  // Re-render editor
  displaySlideEditor(currentPresentationData, currentPresentationData.template);
  console.log("📋 Slide duplicated");
}

// ============================
// SAVE & EXPORT FUNCTIONS
// ============================

function savePresentation() {
  if (!currentPresentationData) return;

  localStorage.setItem("brightslides_data", JSON.stringify(currentPresentationData));
  alert("✅ Presentation saved successfully!");
  console.log("💾 Saved to localStorage:", currentPresentationData);
}

function exportPresentation() {
  if (!currentPresentationData) return;

  const design = currentPresentationData.design;
  
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div class="success-message">
      <h3>✅ Ready to Export!</h3>
      <p><strong>Title:</strong> ${currentPresentationData.title}</p>
      <p><strong>Slides:</strong> ${currentPresentationData.slideCount}</p>
      <p><strong>Design:</strong> ${design.name}</p>
      
      <div class="action-buttons">
        <button onclick="openGoogleSlidesWithData()" class="btn-primary">
          📊 Create in Google Slides
        </button>
        <button onclick="downloadAsJSON()" class="btn-primary">
          💾 Download as JSON
        </button>
        <button onclick="copyToClipboard()" class="btn-secondary">
          📋 Copy Slides Text
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

// =========================
// EXPORT ACTION FUNCTIONS 
// =========================

function openGoogleSlidesWithData() {
  if (!currentPresentationData) return;

  let slidesContent = `${currentPresentationData.title}\n\n`;
  
  currentPresentationData.slides.forEach((slide, i) => {
    slidesContent += `SLIDE ${i + 1}: ${slide.title}\n`;
    slide.bullets.forEach(bullet => {
      if (bullet) {
        slidesContent += `• ${bullet}\n`;
      }
    });
    slidesContent += `\n---\n\n`;
  });

  navigator.clipboard.writeText(slidesContent).then(() => {
    const newWindow = window.open('https://docs.google.com/presentation/create', '_blank');
    
    setTimeout(() => {
      alert(`✅ Content copied to clipboard!\n\n📝 Instructions:\n1. Google Slides has opened\n2. Paste the content (Ctrl+V or Cmd+V)\n3. Design template: ${currentPresentationData.design.name}\n4. Primary color: ${currentPresentationData.design.primaryColor}\n5. Accent color: ${currentPresentationData.design.accentColor}`);
    }, 1000);
  }).catch(err => {
    console.error("Clipboard error:", err);
    alert("Please manually copy the slide content from the preview above");
    window.open('https://docs.google.com/presentation/create', '_blank');
  });
}

function downloadAsJSON() {
  if (!currentPresentationData) return;

  const jsonString = JSON.stringify(currentPresentationData, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${currentPresentationData.topic.replace(/\s+/g, '_')}_presentation.json`;
  link.click();
  URL.revokeObjectURL(url);
  alert("✅ JSON file downloaded!");
}

function copyToClipboard() {
  if (!currentPresentationData) return;

  let text = `${currentPresentationData.title}\n\n`;
  
  currentPresentationData.slides.forEach((slide, i) => {
    text += `Slide ${i + 1}: ${slide.title}\n`;
    slide.bullets.forEach(bullet => {
      if (bullet) {
        text += `• ${bullet}\n`;
      }
    });
    text += `\n`;
  });

  navigator.clipboard.writeText(text).then(() => {
    alert("✅ Slide content copied to clipboard!");
  }).catch(err => {
    console.error("Copy error:", err);
    alert("Failed to copy. Please try again.");
  });
}


// ============================================
// STEP 3: DISPLAY SUCCESS & OPTIONS
// ============================================
function displaySuccess(presentationData, template) {
  const design = DESIGN_TEMPLATES[template];
  
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <div class="success-message">
      <h3>✅ Presentation Generated Successfully!</h3>
      <p><strong>Title:</strong> ${presentationData.title}</p>
      <p><strong>Slides:</strong> ${presentationData.slideCount}</p>
      <p><strong>Design:</strong> ${design.name}</p>
      
      <div class="action-buttons">
        <button onclick="openGoogleSlidesWithData()" class="btn-primary">
          📊 Create in Google Slides
        </button>
        <button onclick="downloadAsJSON()" class="btn-primary">
          💾 Download as JSON
        </button>
        <button onclick="copyToClipboard()" class="btn-secondary">
          📋 Copy Slides Text
        </button>
      </div>
      
      <div class="slide-preview">
        <h4>📋 Slide Preview:</h4>
        ${presentationData.slides.slice(0, 3).map((slide, i) => `
          <div class="preview-slide" style="border-left: 4px solid ${design.accentColor}; padding: 12px; margin: 10px 0; background: #1e293b; border-radius: 6px;">
            <strong style="color: ${design.accentColor};">Slide ${i + 1}: ${slide.title}</strong>
            <ul style="margin: 8px 0; padding-left: 20px; color: #94a3b8; font-size: 13px;">
              ${slide.bullets.map(b => `<li>${b}</li>`).join('')}
            </ul>
          </div>
        `).join('')}
        ${presentationData.slides.length > 3 ? `<p style="color: #64748b; font-size: 13px; margin-top: 10px;">... and ${presentationData.slides.length - 3} more slides</p>` : ''}
      </div>
    </div>
  `;
  
  document.getElementById("output").classList.remove("hidden");
  
  // Save to localStorage
  localStorage.setItem("brightslides_data", JSON.stringify(presentationData));
  console.log("✅ Presentation data saved to localStorage");
}

// ===================
// ACTION FUNCTIONS
// ===================

// Open Google Slides and paste content
function openGoogleSlidesWithData() {
  const saved = localStorage.getItem("brightslides_data");
  if (!saved) {
    alert("No presentation data found");
    return;
  }

  const data = JSON.parse(saved);
  const design = data.design;

  // Create HTML content for Google Slides
  let slidesContent = `${data.title}\n\n`;
  
  data.slides.forEach((slide, i) => {
    slidesContent += `SLIDE ${i + 1}: ${slide.title}\n`;
    slide.bullets.forEach(bullet => {
      slidesContent += `• ${bullet}\n`;
    });
    slidesContent += `\n---\n\n`;
  });

  // Copy to clipboard
  navigator.clipboard.writeText(slidesContent).then(() => {
    // Open Google Slides
    const newWindow = window.open('https://docs.google.com/presentation/create', '_blank');
    
    setTimeout(() => {
      alert(`✅ Content copied to clipboard!\n\n📝 Instructions:\n1. Google Slides has opened\n2. Paste the content (Ctrl+V or Cmd+V)\n3. Design template: ${design.name}\n4. Primary color: ${design.primaryColor}\n5. Accent color: ${design.accentColor}`);
    }, 1000);
  }).catch(err => {
    console.error("Clipboard error:", err);
    alert("Please manually copy the slide content from the preview above");
    window.open('https://docs.google.com/presentation/create', '_blank');
  });
}

// Download as JSON
function downloadAsJSON() {
  const saved = localStorage.getItem("brightslides_data");
  if (!saved) {
    alert("No presentation data found");
    return;
  }

  const data = JSON.parse(saved);
  const jsonString = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${data.topic.replace(/\s+/g, '_')}_presentation.json`;
  link.click();
  URL.revokeObjectURL(url);
  alert("✅ JSON file downloaded!");
}

// Copy slide text to clipboard
function copyToClipboard() {
  const saved = localStorage.getItem("brightslides_data");
  if (!saved) {
    alert("No presentation data found");
    return;
  }

  const data = JSON.parse(saved);
  let text = `${data.title}\n\n`;
  
  data.slides.forEach((slide, i) => {
    text += `Slide ${i + 1}: ${slide.title}\n`;
    slide.bullets.forEach(bullet => {
      text += `• ${bullet}\n`;
    });
    text += `\n`;
  });

  navigator.clipboard.writeText(text).then(() => {
    alert("✅ Slide content copied to clipboard!");
  }).catch(err => {
    console.error("Copy error:", err);
    alert("Failed to copy. Please try again.");
  });
}

// ====================
// HELPER FUNCTIONS
// ====================

function closeModal() {
  document.getElementById("output").classList.add("hidden");
  document.getElementById("topic").value = "";
  document.getElementById("count").value = "10";
  currentPresentationData = null;
}

// Load saved slides on page load
window.addEventListener("DOMContentLoaded", () => {
  const saved = localStorage.getItem("brightslides_data");
  if (saved) {
    console.log("📂 Loaded saved slides from localStorage");
  }
});

