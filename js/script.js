document.addEventListener("DOMContentLoaded", () => {
  console.log("Página lista ✅");
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener("click", e=>{
    const id=a.getAttribute("href");
    const el=document.querySelector(id);
    if(el){ e.preventDefault(); el.scrollIntoView({behavior:"smooth",block:"start"}); }
  });
});



// ===== Filtro de calendario (por mes y texto) =====
(function(){
  const list = document.getElementById("partidos");
  if(!list) return; // solo corre en calendario.html

  const selMes = document.getElementById("mes");
  const q = document.getElementById("q");
  const count = document.getElementById("calCount");
  const empty = document.getElementById("calEmpty");

  const items = Array.from(list.querySelectorAll(".game-card"));

  function normalizar(str){
    return (str || "").toLowerCase()
      .normalize("NFD").replace(/[\u0300-\u036f]/g,"") // quitar tildes
      .replace(/\s+/g," ").trim();
  }

  function aplicarFiltro(){
    const mes = selMes.value;               // "" o "10".."12","1".."4"
    const term = normalizar(q.value);

    let visibles = 0;
    items.forEach(li=>{
      const liMes = li.getAttribute("data-month");
      const hayMes = (!mes || mes === liMes);
      const txt = normalizar(li.getAttribute("data-text"));
      const hayQ = (!term || txt.includes(term));
      const show = hayMes && hayQ;
      li.style.display = show ? "" : "none";
      if(show) visibles++;
    });

    count.textContent = String(visibles);
    empty.hidden = visibles > 0;
  }

  selMes?.addEventListener("change", aplicarFiltro);
  q?.addEventListener("input", aplicarFiltro);

  // init
  aplicarFiltro();
})();
