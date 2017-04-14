(c,d,b,a,g){
b=50;
d=-130>=d?0:-80<=d?1:(d- -130)/b;
b=document.createElement("canvas");
a=b.getContext("2d");
var e=Math.round(c/20),
       f=Math.round(c/7),
       h=c/2,
       l="rgb("+g.join()+")";
       g="rgba("+g.join()+",0.3)";
e=Math.round(5*f+4*e);
b.width=e;
b.height=c;
var f=(c-h)/2-2,
       k=h+f;
fillWidth=Math.round(d*c);
a.scale(0.75, 1.09);
a.fillStyle=g;
a.save();
a.beginPath();
a.moveTo(0,k);
a.lineTo(e,k);
a.lineTo(e,f);
a.fill();
a.clip();
a.fillStyle=l;
a.fillRect(0,f,fillWidth,h);
a.restore();
return b.toDataURL("image/png")
}
