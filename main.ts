import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
const S="(=@-UZns''''''''FFFFFFFAFFFAFFF'FFF'''''''''''''*//*('''''''''''AF''''''''''''''--<-";
function run(p,q){
const n=p.length,D=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),O=new Uint8Array(65536);
let s=0,c=0,u=0,j=0,g=0,v,w;
try{
for(let t=0;;){
if(t==1e6)throw 10;
if(g<0||g>=n)throw 9;
const e=p[g];
if(e>83)throw 5;
const k=S.charCodeAt(e)-40;
if(k<0)throw 5;
const m=k%5;
if(g+m>=n)throw 9;
t++;
const P=k/5%4|0,H=k/20|0;
if(s<P)throw 2;
if(s-P+H>256)throw 3;
const x=g+1+m;
g=x;
switch(e){
case 0:throw 0;
case 1:D[s++]=p[x-1]<<24>>24;break;
case 2:D[s++]=p[x-4]|p[x-3]<<8|p[x-2]<<16|p[x-1]<<24;break;
case 3:s--;break;
case 4:D[s]=D[s-1];s++;break;
case 5:v=D[s-1];D[s-1]=D[s-2];D[s-2]=v;break;
case 6:D[s]=D[s-2];s++;break;
case 7:v=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=v;break;
case 23:D[s-1]=-D[s-1];break;
case 27:D[s-1]=~D[s-1];break;
case 48:case 49:case 50:v=(p[x-2]|p[x-1]<<8)<<16>>16;if(e==48||(e==49)==(D[--s]==0))g=x+v;break;
case 51:if(c==64)throw 7;C[c++]=x;g=p[x-2]|p[x-1]<<8;break;
case 52:if(!c)throw 8;g=C[--c];break;
case 64:v=D[s-1];if(v<0||v>255)throw 6;D[s-1]=M[v];break;
case 65:v=D[s-1];if(v<0||v>255)throw 6;M[v]=D[s-2];s-=2;break;
case 80:w=""+D[s-1];if(u+w.length>65536)throw 11;s--;for(let i=0;i<w.length;i++)O[u++]=w.charCodeAt(i);break;
case 81:if(u==65536)throw 11;O[u++]=D[--s]&255;break;
case 82:D[s++]=j<q.length?q[j++]:-1;break;
case 83:throw D[--s]&255;
default:{
const b=D[s-1],a=D[s-2];
let r;
if(e==16)r=a+b;
else if(e==17)r=a-b;
else if(e==18)r=Math.imul(a,b);
else if(e==19){if(!b)throw 4;r=a/b;}
else if(e==20){if(!b)throw 4;r=a%b;}
else if(e==21){if(!b)throw 4;r=Math.floor((a>>>0)/(b>>>0));}
else if(e==22){if(!b)throw 4;r=(a>>>0)%(b>>>0);}
else if(e==24)r=a&b;
else if(e==25)r=a|b;
else if(e==26)r=a^b;
else if(e==28)r=a<<b;
else if(e==29)r=a>>b;
else if(e==30)r=a>>>b;
else if(e==32)r=a==b?1:0;
else if(e==33)r=a<b?1:0;
else r=(a>>>0)<(b>>>0)?1:0;
D[s-2]=r;s--;
}
}
}
}catch(z){
return[O.subarray(0,u),z];
}
}
const I=process.env.MAKEFUN_INPUT_DIR??"/input",Y=process.env.MAKEFUN_OUTPUT_DIR??"/output";
for(const d of readdirSync(I).sort()){
const r=run(readFileSync(I+"/"+d+"/program.bin"),readFileSync(I+"/"+d+"/input.bin"));
mkdirSync(Y+"/"+d,{recursive:true});
writeFileSync(Y+"/"+d+"/stdout.bin",r[0]);
writeFileSync(Y+"/"+d+"/exit.txt",r[1]+"\n");
}
