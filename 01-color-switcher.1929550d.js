!function(){var t=document.querySelector("body"),e=document.querySelector("[data-start]"),n=document.querySelector("[data-stop]"),o=null;function r(){return"#".concat(Math.floor(16777215*Math.random()).toString(16))}e.addEventListener("click",(function(){t.style.backgroundColor=r(),e.disabled=!0,n.disabled=!1,o=setInterval((function(){t.style.backgroundColor=r()}),1e3)})),n.addEventListener("click",(function(){clearInterval(o),e.disabled=!1,n.disabled=!0}))}();
//# sourceMappingURL=01-color-switcher.1929550d.js.map