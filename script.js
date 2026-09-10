const WHATSAPP="573217691827";
const products=[
{id:1,n:"Vela Burbuja",p:12000,q:"1 unidad",t:"Para regalar",c:"regalo",d:"Un diseño moderno y delicado, perfecto para regalar o consentir."},
{id:2,n:"Vela en Frasco",p:15000,q:"1 unidad",t:"Para el hogar",c:"hogar",d:"Elegancia y calidez en un solo detalle."},
{id:3,n:"Vela Árbol Navideño",p:14000,q:"1 unidad",t:"Para compartir",c:"compartir",d:"Un toque mágico para esta temporada."},
{id:4,n:"Vela Estrella",p:10000,q:"1 unidad",t:"Para regalar",c:"regalo",d:"Un pequeño detalle para una noche especial."},
{id:5,n:"Vela Clásica",p:9000,q:"1 unidad",t:"Para el hogar",c:"hogar",d:"Simple, cálida y perfecta para el alumbrado."},
{id:6,n:"Pack Compartir",p:25000,q:"6 velitas",t:"Para compartir",c:"compartir",d:"Para encender juntos y llenar la noche de luz."}];
let cart=JSON.parse(localStorage.getItem("ld_cart")||"[]");
const money=n=>new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n);
const openWA=m=>window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(m)}`,"_blank");
const toggle=(id,on)=>{const e=document.getElementById(id);e.classList.toggle("open",on);e.setAttribute("aria-hidden",String(!on));};

function render(filter="todos"){
 const list=filter==="todos"?products:products.filter(p=>p.c===filter);
 document.getElementById("products").innerHTML=list.map(p=>`<article class="product"><div class="product-image"><div class="p-flame"></div><div class="p-candle"></div></div><div class="product-info"><div class="product-head"><h3>${p.n}</h3><span class="tag">${p.t}</span></div><p class="desc">${p.q} · ${p.d}</p><div class="price">${money(p.p)}</div><div class="actions"><button class="add" data-add="${p.id}">+ Agregar</button><button class="buy" data-buy="${p.id}">WhatsApp</button></div></div></article>`).join("");
}
function renderCart(){
 const box=document.getElementById("cartItems");document.getElementById("cartCount").textContent=cart.reduce((a,x)=>a+x.qty,0);
 if(!cart.length){box.innerHTML='<p style="color:#7d8482">Tu pedido está vacío.</p>';return}
 box.innerHTML=cart.map(x=>{const p=products.find(y=>y.id===x.id);return `<div class="cart-line"><div><strong>${p.n}</strong><small>${p.q} · ${money(p.p)}</small></div><div class="qty"><button data-dec="${p.id}">−</button><span>${x.qty}</span><button data-inc="${p.id}">+</button></div></div>`}).join("");
 const total=cart.reduce((a,x)=>a+products.find(p=>p.id===x.id).p*x.qty,0);document.getElementById("cartTotal").textContent=money(total);
}
function save(){localStorage.setItem("ld_cart",JSON.stringify(cart));renderCart()}
function add(id){const f=cart.find(x=>x.id===id);f?f.qty++:cart.push({id,qty:1});save()}
document.addEventListener("click",e=>{
 const a=e.target.closest("[data-add]"),b=e.target.closest("[data-buy]"),i=e.target.closest("[data-inc]"),d=e.target.closest("[data-dec]");
 if(a)add(+a.dataset.add);
 if(b){const p=products.find(x=>x.id===+b.dataset.buy);openWA(`Hola 👋 Quiero comprar ${p.n} (${p.q}) por ${money(p.p)}. ¿Me confirmas disponibilidad?`)}
 if(i){const x=cart.find(v=>v.id===+i.dataset.inc);if(x)x.qty++;save()}
 if(d){const x=cart.find(v=>v.id===+d.dataset.dec);if(x){x.qty--;if(x.qty<=0)cart=cart.filter(v=>v.id!==x.id)}save()}
 if(e.target.closest("[data-close-wish]"))toggle("wishModal",false);
 if(e.target.closest("[data-close-share]"))toggle("shareModal",false);
 if(e.target.closest("[data-close-cart]"))toggle("cart",false);
});
document.querySelectorAll(".filter").forEach(x=>x.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(y=>y.classList.remove("active"));x.classList.add("active");render(x.dataset.filter)}));
["waHeader","waCatalog","heroWa","mobileWa"].forEach(id=>document.getElementById(id)?.addEventListener("click",()=>openWA("Hola 👋 Quiero información sobre las velitas del 7 de diciembre.")));
document.getElementById("wishHotspot").onclick=()=>toggle("wishModal",true);
document.getElementById("wishSend").onclick=()=>{const v=document.getElementById("wishInput").value.trim();if(v){alert("✨ "+v+"\n\nTu deseo queda encendido por esta noche.");toggle("wishModal",false)}};
document.getElementById("shareBtn").onclick=()=>toggle("shareModal",true);
document.getElementById("shareWhatsApp").onclick=()=>openWA("Hola 👋 Te comparto una velita de Luz de Diciembre para este 7 de diciembre 🕯️✨.");
document.getElementById("cartButton").onclick=()=>toggle("cart",true);
document.getElementById("sendOrder").onclick=()=>{
 if(!cart.length)return openWA("Hola 👋 Quiero información sobre las velitas del 7 de diciembre.");
 let total=0;const lines=cart.map(x=>{const p=products.find(y=>y.id===x.id);total+=p.p*x.qty;return `• ${x.qty} × ${p.n}`});
 openWA(`Hola 👋 Quiero hacer este pedido:\n\n${lines.join("\n")}\n\n💰 Total: ${money(total)}\n\n¿Me confirmas disponibilidad y entrega?`);
};
document.getElementById("menu").onclick=()=>alert("En la versión móvil usa la barra y los botones de la página.");
render();renderCart();
/* ===== ADMINISTRADOR LOCAL ===== */
(function(){
  const STORAGE="luz_diciembre_products_v2";
  const seed = [
    {id:1,n:"Vela Burbuja",p:12000,q:"1 unidad",t:"Para regalar",c:"regalo",d:"Un diseño moderno y delicado, perfecto para regalar o consentir.",available:true,image:""},
    {id:2,n:"Vela en Frasco",p:15000,q:"1 unidad",t:"Para el hogar",c:"hogar",d:"Elegancia y calidez en un solo detalle.",available:true,image:""},
    {id:3,n:"Vela Árbol Navideño",p:14000,q:"1 unidad",t:"Para compartir",c:"compartir",d:"Un toque mágico para esta temporada.",available:true,image:""},
    {id:4,n:"Vela Estrella",p:10000,q:"1 unidad",t:"Para regalar",c:"regalo",d:"Un pequeño detalle para una noche especial.",available:true,image:""},
    {id:5,n:"Vela Clásica",p:9000,q:"1 unidad",t:"Para el hogar",c:"hogar",d:"Simple, cálida y perfecta para el alumbrado.",available:true,image:""},
    {id:6,n:"Pack Compartir",p:25000,q:"6 velitas",t:"Para compartir",c:"compartir",d:"Para encender juntos y llenar la noche de luz.",available:true,image:""}
  ];
  let adminProducts=JSON.parse(localStorage.getItem(STORAGE)||"null");
  if(!Array.isArray(adminProducts)){
    adminProducts=seed.map(p=>({...p}));
    localStorage.setItem(STORAGE,JSON.stringify(adminProducts));
  }

  const modal=document.getElementById("adminModal");
  const form=document.getElementById("adminForm");
  const imageInput=document.getElementById("productImage");
  const preview=document.getElementById("photoPreview");
  const productsBox=document.getElementById("adminProductList");

  function save(){localStorage.setItem(STORAGE,JSON.stringify(adminProducts))}
  function moneyAdmin(n){return new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(n)}
  function syncCatalogSource(){
    // The public catalog can be re-rendered by the existing code when the window reloads.
    window.dispatchEvent(new CustomEvent("luz:productsChanged",{detail:adminProducts}));
  }
  function stats(){
    document.getElementById("adminTotal").textContent=adminProducts.length;
    document.getElementById("adminAvailable").textContent=adminProducts.filter(p=>p.available).length;
    document.getElementById("adminSoldOut").textContent=adminProducts.filter(p=>!p.available).length;
  }
  function thumb(p){
    return p.image
      ? `<img src="${p.image}" alt="">`
      : `<div class="admin-mini-candle"></div>`;
  }
  function renderAdmin(){
    stats();
    productsBox.innerHTML=adminProducts.length?adminProducts.map(p=>`
      <div class="admin-product">
        <div class="admin-thumb">${thumb(p)}</div>
        <div class="admin-product-info">
          <strong>${p.n}</strong>
          <small>${p.q} · ${p.t}</small>
          <div class="admin-price">${moneyAdmin(p.p)}</div>
          <div class="admin-status ${p.available?"ok":"off"}">${p.available?"● Disponible":"● Agotado"}</div>
        </div>
        <div class="admin-product-actions">
          <button data-admin-edit="${p.id}">Editar</button>
          <button data-admin-toggle="${p.id}">${p.available?"Agotado":"Activar"}</button>
          <button data-admin-delete="${p.id}">Eliminar</button>
        </div>
      </div>`).join(""):`<p style="color:#777f7d">Todavía no hay productos.</p>`;
  }

  function resetForm(){
    form.reset();
    document.getElementById("editId").value="";
    document.getElementById("productAvailable").checked=true;
    preview.innerHTML="<span>📷</span><small>Foto del producto</small>";
  }
  function editProduct(id){
    const p=adminProducts.find(x=>x.id===id);if(!p)return;
    document.getElementById("editId").value=p.id;
    document.getElementById("productName").value=p.n;
    document.getElementById("productPrice").value=p.p;
    document.getElementById("productQty").value=p.q;
    document.getElementById("productCat").value=p.c;
    document.getElementById("productDesc").value=p.d;
    document.getElementById("productAvailable").checked=!!p.available;
    preview.innerHTML=p.image?`<img src="${p.image}" alt="">`:"<span>📷</span><small>Sin foto</small>";
    showTab("new");
  }
  function showTab(tab){
    document.querySelectorAll(".admin-tab").forEach(b=>b.classList.toggle("active",b.dataset.adminTab===tab));
    document.getElementById("adminProductsView").classList.toggle("active",tab==="products");
    document.getElementById("adminNewView").classList.toggle("active",tab==="new");
    if(tab==="products")renderAdmin();
  }
  function openAdmin(){renderAdmin();resetForm();showTab("products");toggle("adminModal",true)}
  function closeAdmin(){toggle("adminModal",false)}

  document.getElementById("adminOpen")?.addEventListener("click",openAdmin);
  document.querySelectorAll("[data-close-admin]").forEach(x=>x.addEventListener("click",closeAdmin));
  document.querySelectorAll("[data-admin-tab]").forEach(x=>x.addEventListener("click",()=>showTab(x.dataset.adminTab)));
  document.getElementById("adminCancelEdit")?.addEventListener("click",()=>{resetForm();showTab("products")});

  imageInput?.addEventListener("change",()=>{
    const file=imageInput.files?.[0];if(!file)return;
    const reader=new FileReader();
    reader.onload=()=>{preview.innerHTML=`<img src="${reader.result}" alt="">`;preview.dataset.image=reader.result};
    reader.readAsDataURL(file);
  });

  form?.addEventListener("submit",e=>{
    e.preventDefault();
    const editId=Number(document.getElementById("editId").value||0);
    const old=editId?adminProducts.find(x=>x.id===editId):null;
    const image=preview.dataset.image || old?.image || "";
    const product={
      id:editId||Date.now(),
      n:document.getElementById("productName").value.trim(),
      p:Number(document.getElementById("productPrice").value||0),
      q:document.getElementById("productQty").value.trim(),
      t:({regalo:"Para regalar",hogar:"Para el hogar",compartir:"Para compartir"})[document.getElementById("productCat").value],
      c:document.getElementById("productCat").value,
      d:document.getElementById("productDesc").value.trim(),
      available:document.getElementById("productAvailable").checked,
      image
    };
    if(editId) adminProducts=adminProducts.map(p=>p.id===editId?product:p);
    else adminProducts.push(product);
    save();syncCatalogSource();resetForm();showTab("products");
    alert(editId?"Producto actualizado.":"Producto agregado.");
  });

  productsBox?.addEventListener("click",e=>{
    const edit=e.target.closest("[data-admin-edit]");
    const toggleBtn=e.target.closest("[data-admin-toggle]");
    const del=e.target.closest("[data-admin-delete]");
    if(edit)editProduct(Number(edit.dataset.adminEdit));
    if(toggleBtn){
      const p=adminProducts.find(x=>x.id===Number(toggleBtn.dataset.adminToggle));
      if(p){p.available=!p.available;save();renderAdmin();syncCatalogSource();}
    }
    if(del){
      const id=Number(del.dataset.adminDelete);
      if(confirm("¿Eliminar este producto?")){
        adminProducts=adminProducts.filter(p=>p.id!==id);save();renderAdmin();syncCatalogSource();
      }
    }
  });

  // Expose products for the main storefront renderer.
  window.getLuzProducts=()=>adminProducts.filter(p=>p.available);
  window.addEventListener("luz:productsChanged",()=>{});
})();

(function(){
  const applyAdminCatalog=()=>{
    try{
      const stored=JSON.parse(localStorage.getItem("luz_diciembre_products_v2")||"null");
      if(Array.isArray(stored) && stored.length){
        products.length=0;
        stored.filter(p=>p.available!==false).forEach(p=>{
          products.push({id:p.id,n:p.n,p:p.p,q:p.q,t:p.t,c:p.c,d:p.d,image:p.image||""});
        });
        if(typeof render==="function"){
          const active=document.querySelector(".filter.active");
          render(active?.dataset.filter||"todos");
        }
      }
    }catch(err){console.warn("No se pudo cargar el catálogo administrado",err)}
  };
  window.addEventListener("load",applyAdminCatalog);
  window.addEventListener("luz:productsChanged",applyAdminCatalog);
})();

/* ===== ADMIN PRIVADO + CATÁLOGO PDF ===== */
(function(){
  const ADMIN_CODE = "0712"; // Puedes cambiarlo por otro código.
  const STORE_KEY = "luz_diciembre_products_v2";
  const adminModal = document.getElementById("adminModal");

  // Keep the existing admin panel functional, but remove its public entry point.
  // Desktop/mobile: Ctrl+Shift+A -> code -> open panel.
  function openPrivateAdmin(){
    const code = prompt("Panel privado. Ingresa tu código:");
    if(code !== ADMIN_CODE) return;
    if(typeof toggle === "function") toggle("adminModal", true);
    else adminModal?.classList.add("open");
  }
  document.addEventListener("keydown", e=>{
    if(e.ctrlKey && e.shiftKey && e.key.toLowerCase()==="a"){
      e.preventDefault();
      openPrivateAdmin();
    }
  });

  // Also expose a private programmatic access point for the owner.
  window.openLuzAdmin = openPrivateAdmin;

  function getAvailableProducts(){
    try{
      const stored=JSON.parse(localStorage.getItem(STORE_KEY)||"null");
      if(Array.isArray(stored) && stored.length){
        return stored.filter(p=>p.available!==false);
      }
    }catch(err){}
    return (window.products || []).filter(p=>p.available!==false);
  }
  function loadJsPdf(){
    return new Promise((resolve,reject)=>{
      if(window.jspdf?.jsPDF){resolve(window.jspdf.jsPDF);return;}
      const s=document.createElement("script");
      s.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
      s.onload=()=>window.jspdf?.jsPDF?resolve(window.jspdf.jsPDF):reject(new Error("jsPDF no disponible"));
      s.onerror=()=>reject(new Error("No se pudo cargar el generador PDF"));
      document.head.appendChild(s);
    });
  }
  function dataImageType(data){
    if(/^data:image\/png/i.test(data))return "PNG";
    if(/^data:image\/webp/i.test(data))return "WEBP";
    return "JPEG";
  }
  function drawWrapped(doc, text, x, y, maxWidth, lineHeight){
    const lines=doc.splitTextToSize(text,maxWidth);
    doc.text(lines,x,y);
    return y + lines.length*lineHeight;
  }
  async function downloadCatalogPDF(){
    const products=getAvailableProducts();
    if(!products.length){
      alert("No hay velitas disponibles para generar el catálogo.");
      return;
    }
    const btn=document.getElementById("downloadCatalogPdf");
    const old=btn?.innerHTML;
    if(btn){btn.disabled=true;btn.innerHTML="Preparando catálogo…";}
    try{
      const jsPDF=await loadJsPdf();
      const doc=new jsPDF({orientation:"portrait",unit:"mm",format:"a4"});
      const W=210,H=297;
      // Background
      doc.setFillColor(6,17,22);doc.rect(0,0,W,H,"F");
      doc.setTextColor(245,232,203);
      doc.setFont("times","bold");doc.setFontSize(30);
      doc.text("LUZ DE DICIEMBRE",20,32);
      doc.setFont("times","normal");doc.setTextColor(223,184,103);doc.setFontSize(18);
      doc.text("7 de diciembre · Tradición que ilumina",20,44);
      doc.setTextColor(180,180,175);doc.setFont("helvetica","normal");doc.setFontSize(10);
      doc.text("Catálogo de velitas disponibles",20,56);
      doc.setDrawColor(180,137,62);doc.setLineWidth(.3);doc.line(20,63,190,63);

      let y=78;
      const cardH=61;
      const colW=82;
      products.forEach((p,idx)=>{
        const col=(idx%2), row=Math.floor(idx/2);
        const x=20+col*(colW+10);
        if(idx>0 && col===0) y += cardH+10;
        if(y+cardH>275){
          doc.addPage();doc.setFillColor(6,17,22);doc.rect(0,0,W,H,"F");
          y=22;
        }
        doc.setFillColor(12,28,34);doc.roundedRect(x,y,colW,cardH,4,4,"F");
        doc.setDrawColor(110,87,46);doc.roundedRect(x,y,colW,cardH,4,4,"S");
        if(p.image && /^data:image\//.test(p.image)){
          try{doc.addImage(p.image,dataImageType(p.image),x+4,y+4,28,33,undefined,"FAST");}
          catch(err){/* keep the card without image */}
        }else{
          doc.setFillColor(28,50,50);doc.circle(x+18,y+20,12,"F");
          doc.setTextColor(238,197,108);doc.setFontSize(16);doc.text("✦",x+15,y+24);
        }
        doc.setTextColor(243,225,188);doc.setFont("times","bold");doc.setFontSize(14);
        const titleLines=doc.splitTextToSize(p.n||"Velita",47);
        doc.text(titleLines,x+36,y+13);
        doc.setTextColor(200,170,104);doc.setFont("helvetica","bold");doc.setFontSize(10);
        doc.text(new Intl.NumberFormat("es-CO",{style:"currency",currency:"COP",maximumFractionDigits:0}).format(p.p||0),x+36,y+29);
        doc.setTextColor(150,155,152);doc.setFont("helvetica","normal");doc.setFontSize(8);
        doc.text(p.q||"1 unidad",x+36,y+37);
        const desc=(p.d||"").slice(0,130);
        drawWrapped(doc,desc,x+36,y+45,42,3.6);
      });

      const totalPages=doc.getNumberOfPages();
      for(let page=1;page<=totalPages;page++){
        doc.setPage(page);
        doc.setTextColor(120,125,122);doc.setFont("helvetica","normal");doc.setFontSize(7);
        doc.text(`Luz de Diciembre · Página ${page} de ${totalPages}`,20,289);
        doc.text("Pedidos por WhatsApp",190,289,{align:"right"});
      }

      doc.save("catalogo-luz-de-diciembre.pdf");
    }catch(err){
      console.error(err);
      alert("No fue posible generar el PDF en este momento. Comprueba que tienes conexión a Internet e inténtalo de nuevo.");
    }finally{
      if(btn){btn.disabled=false;btn.innerHTML=old||"↓ Descargar catálogo PDF";}
    }
  }
  document.getElementById("downloadCatalogPdf")?.addEventListener("click",downloadCatalogPDF);
  window.downloadLuzCatalogPDF=downloadCatalogPDF;
})();

/* ===== ACCESO ADMIN EN CELULAR: 5 TOQUES RÁPIDOS ===== */
(function(){
  const logo=document.getElementById("brandLogo");
  const adminButton=document.getElementById("adminOpen");
  if(!logo || !adminButton) return;

  let taps=0;
  let resetTimer=null;
  let lastPointer=0;

  function reset(){
    taps=0;
    if(resetTimer) clearTimeout(resetTimer);
    resetTimer=null;
  }

  logo.addEventListener("pointerup",(event)=>{
    const mobile=window.matchMedia("(max-width:900px)").matches;
    if(!mobile) return;
    if(event.pointerType==="mouse" && event.detail!==0) return;

    event.preventDefault();
    const now=Date.now();
    if(now-lastPointer<80) return;
    lastPointer=now;

    taps+=1;
    if(resetTimer) clearTimeout(resetTimer);
    resetTimer=setTimeout(reset,1500);

    if(taps===5){
      reset();
      const code=prompt("Acceso privado");
      if(code==="0712"){
        adminButton.click();
      }
    }
  },{passive:false});
})();

/* ============================================================
   ADMIN MÓVIL V3 — 5 TOQUES RÁPIDOS EN EL LOGO
   ============================================================ */
(function(){
  const logo=document.getElementById("brandLogo");
  const adminBtn=document.getElementById("adminOpen");
  if(!logo || !adminBtn) return;

  let taps=0;
  let timer=null;
  let lastTap=0;

  function reset(){
    taps=0;
    if(timer) clearTimeout(timer);
    timer=null;
  }

  logo.addEventListener("pointerup", function(ev){
    if(!window.matchMedia("(max-width:900px)").matches) return;
    if(ev.pointerType==="mouse") return;

    ev.preventDefault();
    ev.stopPropagation();

    const now=Date.now();
    if(now-lastTap < 70) return;
    lastTap=now;

    taps++;
    if(timer) clearTimeout(timer);
    timer=setTimeout(reset,1500);

    if(taps===5){
      reset();
      const pin=prompt("Acceso privado");
      if(pin==="0712"){
        adminBtn.click();
      }
    }
  }, {passive:false});
})();
