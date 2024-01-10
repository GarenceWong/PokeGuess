window.addEventListener("load", () => {
    const loader = document.querySelector(".loader");
    
    loader.classList.add("active");
  
    loader.addEventListener("transitionend", () => {
      document.body.removeChild(loader);
    });
  });

