(d,e,b,a,f){
b=40;
e=-96>=e?0:-56<=e?1:(e- -96)/b;
b=document.createElement("canvas");
a=b.getContext("2d");
var g=d/2,
       h="rgb("+f.join()+")";
       f="rgba("+f.join()+",0.3)";
var c=Math.round(1.6*g);
b.width=c;
b.height=d;
cx=c/2;
y1=(d-g)/2;
y2=g+y1-2;
radius=d/2;
a.scale(1.1, 1.05);
a.fillStyle=f;
a.save();
a.beginPath();
a.arc(cx,y2,radius,0,2*Math.PI);
a.clip();
a.beginPath();
a.moveTo(cx,y2);
a.lineTo(0,y1);
a.lineTo(0,0);
a.lineTo(c,0);
a.lineTo(c,y1);
a.fill();
a.restore();
radius=Math.round(e*d/2);
a.fillStyle=h;
a.beginPath();
a.arc(cx,y2,radius,0,2*Math.PI);
a.clip();
a.beginPath();
a.moveTo(cx,y2);
a.lineTo(0,y1);
a.lineTo(0,0);
a.lineTo(c,0);
a.lineTo(c,y1);
a.fill();
return b.toDataURL("image/png")
}
