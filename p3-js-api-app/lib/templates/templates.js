{
  "templates": [
    {
      "id": "modern-dark",
      "name": "Modern Dark",
      "description": "Sleek dark theme with vibrant accents",
      "category": "modern",
      "colors": {
        "primary": { "hex": "#1e293b", "rgb": "30, 41, 59" },
        "secondary": { "hex": "#0f172a", "rgb": "15, 23, 42" },
        "accent": { "hex": "#6366f1", "rgb": "99, 102, 241" },
        "background": { "hex": "#0f172a", "rgb": "15, 23, 42" },
        "text": { "hex": "#f1f5f9", "rgb": "241, 245, 249" },
        "textLight": { "hex": "#cbd5e1", "rgb": "203, 213, 225" }
      },
      "typography": {
        "heading": {
          "fontFamily": "'Inter', sans-serif",
          "baseSize": 44,
          "lineHeight": 1.2,
          "letterSpacing": -0.5
        },
        "body": {
          "fontFamily": "'Inter', sans-serif",
          "baseSize": 18,
          "lineHeight": 1.6,
          "letterSpacing": 0
        }
      },
      "styles": {
        "title": {
          "fontSize": 44,
          "fontWeight": 700,
          "color": { "hex": "#6366f1" },
          "fontFamily": "'Inter', sans-serif"
        },
        "subtitle": {
          "fontSize": 24,
          "fontWeight": 500,
          "color": { "hex": "#cbd5e1" }
        },
        "bodyText": {
          "fontSize": 18,
          "fontWeight": 400,
          "color": { "hex": "#f1f5f9" },
          "lineHeight": 1.6
        },
        "bulletPoint": {
          "fontSize": 16,
          "fontWeight": 400,
          "color": { "hex": "#e2e8f0" },
          "lineHeight": 1.8
        }
      },
      "layouts": [
        {
          "id": "title-slide",
          "name": "Title Slide",
          "description": "Full-screen title layout",
          "titlePosition": { "x": 60, "y": 120, "width": 720, "height": 200 },
          "contentPosition": { "x": 60, "y": 360, "width": 720, "height": 240 }
        },
        {
          "id": "content-slide",
          "name": "Content Slide",
          "description": "Title with bullet points",
          "titlePosition": { "x": 60, "y": 60, "width": 720, "height": 80 },
          "contentPosition": { "x": 60, "y": 160, "width": 720, "height": 420 }
        }
      ],
      "spacing": {
        "padding": 60,
        "margin": 20,
        "lineGap": 12
      },
      "animations": [
        {
          "id": "fade-in",
          "name": "Fade In",
          "type": "fadeIn",
          "duration": 500
        },
        {
          "id": "slide-up",
          "name": "Slide Up",
          "type": "slideIn",
          "duration": 600
        }
      ],
      "imageSettings": {
        "maxWidth": 600,
        "maxHeight": 400,
        "borderRadius": 12,
        "shadow": true
      },
      "slideTransitions": {
        "type": "fade",
        "duration": 300
      }
    },
    {
      "id": "minimal-white",
      "name": "Minimal White",
      "description": "Clean and simple white background",
      "category": "minimal",
      "colors": {
        "primary": { "hex": "#ffffff", "rgb": "255, 255, 255" },
        "secondary": { "hex": "#f8fafc", "rgb": "248, 250, 252" },
        "accent": { "hex": "#000000", "rgb": "0, 0, 0" },
        "background": { "hex": "#ffffff", "rgb": "255, 255, 255" },
        "text": { "hex": "#1e293b", "rgb": "30, 41, 59" },
        "textLight": { "hex": "#64748b", "rgb": "100, 116, 139" }
      },
      "typography": {
        "heading": {
          "fontFamily": "'Helvetica Neue', sans-serif",
          "baseSize": 48,
          "lineHeight": 1.1,
          "letterSpacing": -1
        },
        "body": {
          "fontFamily": "'Helvetica Neue', sans-serif",
          "baseSize": 16,
          "lineHeight": 1.7,
          "letterSpacing": 0.3
        }
      },
      "styles": {
        "title": {
          "fontSize": 48,
          "fontWeight": 700,
          "color": { "hex": "#000000" },
          "fontFamily": "'Helvetica Neue', sans-serif"
        },
        "subtitle": {
          "fontSize": 24,
          "fontWeight": 400,
          "color": { "hex": "#64748b" }
        },
        "bodyText": {
          "fontSize": 16,
          "fontWeight": 400,
          "color": { "hex": "#1e293b" },
          "lineHeight": 1.7
        },
        "bulletPoint": {
          "fontSize": 14,
          "fontWeight": 400,
          "color": { "hex": "#334155" },
          "lineHeight": 1.8
        }
      },
      "layouts": [
        {
          "id": "title-slide",
          "name": "Title Slide",
          "description": "Full-screen title layout",
          "titlePosition": { "x": 80, "y": 140, "width": 680, "height": 200 },
          "contentPosition": { "x": 80, "y": 380, "width": 680, "height": 200 }
        },
        {
          "id": "content-slide",
          "name": "Content Slide",
          "description": "Title with bullet points",
          "titlePosition": { "x": 80, "y": 60, "width": 680, "height": 80 },
          "contentPosition": { "x": 80, "y": 180, "width": 680, "height": 400 }
        }
      ],
      "spacing": {
        "padding": 80,
        "margin": 24,
        "lineGap": 16
      },
      "animations": [
        {
          "id": "fade-in",
          "name": "Fade In",
          "type": "fadeIn",
          "duration": 400
        }
      ],
      "imageSettings": {
        "maxWidth": 600,
        "maxHeight": 400,
        "borderRadius": 8,
        "shadow": false
      },
      "slideTransitions": {
        "type": "fade",
        "duration": 250
      }
    },
    {
      "id": "corporate-blue",
      "name": "Corporate Blue",
      "description": "Professional blue and white theme",
      "category": "corporate",
      "colors": {
        "primary": { "hex": "#1f4788", "rgb": "31, 71, 136" },
        "secondary": { "hex": "#2d5aa8", "rgb": "45, 90, 168" },
        "accent": { "hex": "#4a90e2", "rgb": "74, 144, 226" },
        "background": { "hex": "#ffffff", "rgb": "255, 255, 255" },
        "text": { "hex": "#1f4788", "rgb": "31, 71, 136" },
        "textLight": { "hex": "#5a6c7d", "rgb": "90, 108, 125" }
      },
      "typography": {
        "heading": {
          "fontFamily": "'Georgia', serif",
          "baseSize": 44,
          "lineHeight": 1.2,
          "letterSpacing": -0.3
        },
        "body": {
          "fontFamily": "'Calibri', sans-serif",
          "baseSize": 18,
          "lineHeight": 1.6,
          "letterSpacing": 0
        }
      },
      "styles": {
        "title": {
          "fontSize": 44,
          "fontWeight": 700,
          "color": { "hex": "#1f4788" },
          "fontFamily": "'Georgia', serif"
        },
        "subtitle": {
          "fontSize": 22,
          "fontWeight": 500,
          "color": { "hex": "#4a90e2" }
        },
        "bodyText": {
          "fontSize": 18,
          "fontWeight": 400,
          "color": { "hex": "#1f4788" },
          "lineHeight": 1.6
        },
        "bulletPoint": {
          "fontSize": 16,
          "fontWeight": 400,
          "color": { "hex": "#2d5aa8" },
          "lineHeight": 1.8
        }
      },
      "layouts": [
        {
          "id": "title-slide",
          "name": "Title Slide",
          "description": "Full-screen title layout",
          "titlePosition": { "x": 60, "y": 100, "width": 720, "height": 220 },
          "contentPosition": { "x": 60, "y": 360, "width": 720, "height": 240 }
        },
        {
          "id": "content-slide",
          "name": "Content Slide",
          "description": "Title with bullet points",
          "titlePosition": { "x": 60, "y": 40, "width": 720, "height": 80 },
          "contentPosition": { "x": 60, "y": 140, "width": 720, "height": 440 }
        }
      ],
      "spacing": {
        "padding": 60,
        "margin": 20,
        "lineGap": 14
      },
      "animations": [
        {
          "id": "fade-in",
          "name": "Fade In",
          "type": "fadeIn",
          "duration": 500
        }
      ],
      "imageSettings": {
        "maxWidth": 600,
        "maxHeight": 400,
        "borderRadius": 4,
        "shadow": true
      },
      "slideTransitions": {
        "type": "slide",
        "duration": 400
      }
    },
    {
      "id": "startup-gradient",
      "name": "Startup Gradient",
      "description": "Modern gradient and vibrant colors",
      "category": "startup",
      "colors": {
        "primary": { "hex": "#6366f1", "rgb": "99, 102, 241" },
        "secondary": { "hex": "#8b5cf6", "rgb": "139, 92, 246" },
        "accent": { "hex": "#ec4899", "rgb": "236, 72, 153" },
        "background": { "hex": "#ffffff", "rgb": "255, 255, 255" },
        "text": { "hex": "#1e293b", "rgb": "30, 41, 59" },
        "textLight": { "hex": "#64748b", "rgb": "100, 116, 139" }
      },
      "typography": {
        "heading": {
          "fontFamily": "'Poppins', sans-serif",
          "baseSize": 48,
          "lineHeight": 1.1,
          "letterSpacing": -0.5
        },
        "body": {
          "fontFamily": "'Poppins', sans-serif",
          "baseSize": 16,
          "lineHeight": 1.7,
          "letterSpacing": 0.2
        }
      },
      "styles": {
        "title": {
          "fontSize": 48,
          "fontWeight": 700,
          "color": { "hex": "#6366f1" },
          "fontFamily": "'Poppins', sans-serif"
        },
        "subtitle": {
          "fontSize": 24,
          "fontWeight": 600,
          "color": { "hex": "#ec4899" }
        },
        "bodyText": {
          "fontSize": 16,
          "fontWeight": 500,
          "color": { "hex": "#1e293b" },
          "lineHeight": 1.7
        },
        "bulletPoint": {
          "fontSize": 15,
          "fontWeight": 500,
          "color": { "hex": "#64748b" },
          "lineHeight": 1.8
        }
      },
      "layouts": [
        {
          "id": "title-slide",
          "name": "Title Slide",
          "description": "Full-screen title layout",
          "titlePosition": { "x": 60, "y": 120, "width": 720, "height": 240 },
          "contentPosition": { "x": 60, "y": 400, "width": 720, "height": 200 }
        },
        {
          "id": "content-slide",
          "name": "Content Slide",
          "description": "Title with bullet points",
          "titlePosition": { "x": 60, "y": 50, "width": 720, "height": 100 },
          "contentPosition": { "x": 60, "y": 180, "width": 720, "height": 420 }
        }
      ],
      "spacing": {
        "padding": 60,
        "margin": 16,
        "lineGap": 12
      },
      "animations": [
        {
          "id": "scale-in",
          "name": "Scale In",
          "type": "scaleIn",
          "duration": 500
        }
      ],
      "imageSettings": {
        "maxWidth": 600,
        "maxHeight": 400,
        "borderRadius": 16,
        "shadow": true
      },
      "slideTransitions": {
        "type": "wipeRight",
        "duration": 400
      }
    },
    {
      "id": "creative-colorful",
      "name": "Creative Colorful",
      "description": "Vibrant and playful design",
      "category": "creative",
      "colors": {
        "primary": { "hex": "#ff6b6b", "rgb": "255, 107, 107" },
        "secondary": { "hex": "#ffd93d", "rgb": "255, 217, 61" },
        "accent": { "hex": "#6bcf7f", "rgb": "107, 207, 127" },
        "background": { "hex": "#fffbf0", "rgb": "255, 251, 240" },
        "text": { "hex": "#2d3436", "rgb": "45, 52, 54" },
        "textLight": { "hex": "#636e72", "rgb": "99, 110, 114" }
      },
      "typography": {
        "heading": {
          "fontFamily": "'Fredoka', sans-serif",
          "baseSize": 52,
          "lineHeight": 1.1,
          "letterSpacing": -0.8
        },
        "body": {
          "fontFamily": "'Fredoka', sans-serif",
          "baseSize": 16,
          "lineHeight": 1.8,
          "letterSpacing": 0.3
        }
      },
      "styles": {
        "title": {
          "fontSize": 52,
          "fontWeight": 800,
          "color": { "hex": "#ff6b6b" },
          "fontFamily": "'Fredoka', sans-serif"
        },
        "subtitle": {
          "fontSize": 26,
          "fontWeight": 700,
          "color": { "hex": "#ffd93d" }
        },
        "bodyText": {
          "fontSize": 16,
          "fontWeight": 600,
          "color": { "hex": "#2d3436" },
          "lineHeight": 1.8
        },
        "bulletPoint": {
          "fontSize": 15,
          "fontWeight": 600,
          "color": { "hex": "#6bcf7f" },
          "lineHeight": 1.9
        }
      },
      "layouts": [
        {
          "id": "title-slide",
          "name": "Title Slide",
          "description": "Full-screen title layout",
          "titlePosition": { "x": 60, "y": 100, "width": 720, "height": 260 },
          "contentPosition": { "x": 60, "y": 400, "width": 720, "height": 200 }
        },
        {
          "id": "content-slide",
          "name": "Content Slide",
          "description": "Title with bullet points",
          "titlePosition": { "x": 60, "y": 40, "width": 720, "height": 110 },
          "contentPosition": { "x": 60, "y": 180, "width": 720, "height": 420 }
        }
      ],
      "spacing": {
        "padding": 60,
        "margin": 18,
        "lineGap": 14
      },
      "animations": [
        {
          "id": "slide-in",
          "name": "Slide In",
          "type": "slideIn",
          "duration": 600
        }
      ],
      "imageSettings": {
        "maxWidth": 600,
        "maxHeight": 400,
        "borderRadius": 20,
        "shadow": true
      },
      "slideTransitions": {
        "type": "fade",
        "duration": 350
      }
    }
  ]
}