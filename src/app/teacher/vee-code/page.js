// pages/vee-accessibility.js

"use client";

import TeacherLayout from "@/components/layout/teacherLayout/teacherLayout";
import { useEffect } from "react";

const VeeAccessibilityPage = () => {
  useEffect(() => {
    // Check if the script is already present
    const existingScript = document.querySelector(
      'script[src="https://vee-crm.com/js/"]'
    );
    if (!existingScript) {
      // Initialize Vee's Accessibility Plugin configuration
      window.args = {
        sitekey: "f4b23eb922868ea9a02af493b81d5629",
        position: "Right",
        styles: {
          primary_color: "#177fab",
          secondary_color: "#b586ff",
          background_color: "#f6f6f6",
          primary_text_color: "#636363",
          headers_text_color: "#105675",
          primary_font_size: 14,
          slider_left_color: "#b586ff",
          slider_right_color: "#177fab",
          icon_vertical_position: "top",
          icon_offset_top: 100,
          icon_offset_bottom: 0,
          highlight_focus_color: "#177fab",
          toggler_icon_color: "#ffffff",
        },
        access: "https://vee-crm.com",
        links: {
          acc_policy: "",
          additional_link: "https://vee.co.il/pricing/",
        },
        options: {
          open: false,
          aaa: false,
          hide_tablet: false,
          hide_mobile: false,
          button_size_tablet: 44,
          button_size_mobile: 34,
          position_tablet: "Right",
          position_mobile: "Right",
          icon_vertical_position_tablet: "top",
          icon_vertical_position_mobile: "top",
          icon_offset_top_tablet: 100,
          icon_offset_bottom_tablet: 0,
          icon_offset_top_mobile: 100,
          icon_offset_bottom_mobile: 0,
          keyboard_shortcut: true,
          hide_purchase_link: false,
          display_checkmark_icon: false,
          active_toggler_color: "#118f38",
        },
        exclude: [],
      };

      // Embed the external script
      const embedScript = document.createElement("script");
      embedScript.src = `${window.args.access}/js/`; // Corrected URL
      embedScript.defer = true;
      embedScript.crossOrigin = "anonymous";
      embedScript.setAttribute("data-cfasync", "true");

      embedScript.onload = () => {
        console.log("Vee Accessibility Plugin script loaded successfully.");
      };

      embedScript.onerror = () => {
        console.error("Failed to load Vee Accessibility Plugin script.");
      };

      document.body.appendChild(embedScript);
    } else {
      console.log("Vee Accessibility Plugin script is already loaded.");
    }

    // No need to clean up the script because it's a singleton
  }, []);

  const handleOpenAccessibility = () => {
    if (
      window.VeeAccessibility &&
      typeof window.VeeAccessibility.toggle === "function"
    ) {
      window.VeeAccessibility.toggle();
    } else {
      console.error("Vee Accessibility Plugin is not initialized");
    }
  };

  return (
    <TeacherLayout>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        {/* <h1 className="text-2xl font-bold mb-4">Vee Accessibility Page</h1>
      <button
        onClick={handleOpenAccessibility}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Open Accessibility Menu
      </button> */}
      </div>
    </TeacherLayout>
  );
};

export default VeeAccessibilityPage;
