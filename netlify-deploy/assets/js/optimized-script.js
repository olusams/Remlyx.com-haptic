// Optimized JavaScript - Essential Functionality Only
(function(){
'use strict';
// Preloader
window.addEventListener('load',function(){
document.getElementById('preloader').classList.add('hidden');
setTimeout(function(){
document.getElementById('preloader').style.display='none';
},500);
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded',function(){
const mobileBtn=document.querySelector('.mobile_menu_button');
const mobileMenu=document.querySelector('.mobile_menu_wrap');
const closeBtn=document.querySelector('.mobile_menu_close');
const overlay=document.querySelector('.mobile_menu_overlay');

function toggleMenu(){
mobileMenu.style.display=mobileMenu.style.display==='block'?'none':'block';
}

if(mobileBtn)mobileBtn.addEventListener('click',toggleMenu);
if(closeBtn)closeBtn.addEventListener('click',toggleMenu);
if(overlay)overlay.addEventListener('click',toggleMenu);
});

// Smooth Scroll to Top
document.addEventListener('DOMContentLoaded',function(){
const scrollBtn=document.querySelector('.scrollup');
if(scrollBtn){
window.addEventListener('scroll',function(){
if(window.pageYOffset>300){
scrollBtn.style.display='block';
}else{
scrollBtn.style.display='none';
}
});
scrollBtn.addEventListener('click',function(e){
e.preventDefault();
window.scrollTo({top:0,behavior:'smooth'});
});
}
});

// Header Scroll Effect
window.addEventListener('scroll',function(){
const header=document.querySelector('.bi-header-section');
if(header){
if(window.pageYOffset>100){
header.style.background='rgba(255,255,255,0.95)';
header.style.backdropFilter='blur(10px)';
}else{
header.style.background='var(--white)';
header.style.backdropFilter='none';
}
}
});

// Intersection Observer for Animations
const observerOptions={
threshold:0.1,
rootMargin:'0px 0px -50px 0px'
};

const observer=new IntersectionObserver(function(entries){
entries.forEach(function(entry){
if(entry.isIntersecting){
entry.target.classList.add('fade-in');
}
});
},observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded',function(){
const animateElements=document.querySelectorAll('.bi-service-scroll-item, .bi-main-slider-text');
animateElements.forEach(function(el){
observer.observe(el);
});
});

// Form Validation
document.addEventListener('DOMContentLoaded',function(){
const forms=document.querySelectorAll('form');
forms.forEach(function(form){
form.addEventListener('submit',function(e){
const requiredFields=form.querySelectorAll('[required]');
let isValid=true;
requiredFields.forEach(function(field){
if(!field.value.trim()){
isValid=false;
field.style.borderColor='var(--danger-color)';
}else{
field.style.borderColor='';
}
});
if(!isValid){
e.preventDefault();
alert('Please fill in all required fields.');
}
});
});
});

// Lazy Loading for Images
if('IntersectionObserver' in window){
const imageObserver=new IntersectionObserver(function(entries,observer){
entries.forEach(function(entry){
if(entry.isIntersecting){
const img=entry.target;
img.src=img.dataset.src;
img.classList.remove('lazy');
imageObserver.unobserve(img);
}
});
});
document.addEventListener('DOMContentLoaded',function(){
const lazyImages=document.querySelectorAll('img[data-src]');
lazyImages.forEach(function(img){
imageObserver.observe(img);
});
});
}

// Performance Monitoring
if('performance' in window){
window.addEventListener('load',function(){
setTimeout(function(){
const perfData=performance.getEntriesByType('navigation')[0];
if(perfData){
console.log('Page Load Time:',Math.round(perfData.loadEventEnd-perfData.loadEventStart),'ms');
}
},0);
}
})(); 