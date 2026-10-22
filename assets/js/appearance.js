(() => {
  const storageKey = "color-scheme";
  const media = {
    system: "(prefers-color-scheme: dark)",
    light: "not all",
    dark: "all",
  };
  const darkSkin = document.getElementById("dark-skin");
  const colorScheme = document.querySelector('meta[name="color-scheme"]');
  let preference = "system";

  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved !== null) {
      if (Object.prototype.hasOwnProperty.call(media, saved)) {
        preference = saved;
      } else {
        console.warn("Ignoring an invalid saved appearance preference.");
      }
    }
  } catch (error) {
    console.warn("Could not read the saved appearance preference.", error);
  }

  const applyPreference = () => {
    darkSkin.media = media[preference];
    colorScheme.content = preference === "system" ? "light dark" : preference;
  };

  applyPreference();

  document.addEventListener("DOMContentLoaded", () => {
    const picker = document.getElementById("appearance-picker");
    const select = document.getElementById("color-scheme");
    select.value = preference;
    picker.hidden = false;

    select.addEventListener("change", () => {
      preference = select.value;
      applyPreference();
      try {
        window.localStorage.setItem(storageKey, preference);
      } catch (error) {
        console.warn("Could not save the appearance preference.", error);
      }
    });
  });
})();
