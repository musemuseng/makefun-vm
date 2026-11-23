import F from"node:fs";
const S="(=@-UZns''''''''FFFFFFFAFFFAFFF'FFF'''''''''''''*//*('''''''''''AF''''''''''''''--<-",L=65536,T=n=>{throw n};
function run(p,q){
const n=p.length,D=new Int32Array(256),M=D.slice(),C=new Int32Array(64),O=new Uint8Array(L);
let s=0,c=0,u=0,j=0,g=0,t=0,i,a,b,x,y,e,k,P;
try{
for(;;){
if(t++==1e6)T(10);
if(g<0|g>=n)T(9);
e=p[g];k=S.charCodeAt(e)-40;
if(e>83|k<0)T(5);
g+=1+k%5;
if(g>n)T(9);
P=k/5&3;
if(s<P||s-P+(k/20|0)>256)T(s<P?2:3);
switch(e){
case 0:T(0);
case 1:D[s++]=p[g-1]<<24>>24;break;
case 2:D[s++]=p.readInt32LE(g-4);break;
case 3:s--;break;
case 4:case 6:D[s++]=D[s-e/2];break;
case 5:b=D[s-1];D[s-1]=D[s-2];D[s-2]=b;break;
case 7:b=D[s-3];D[s-3]=D[s-2];D[s-2]=D[s-1];D[s-1]=b;break;
case 23:case 27:b=D[s-1];D[s-1]=e&4?-b:~b;break;
case 48:case 49:case 50:g+=e==48||(e&1)==(D[--s]==0)?p.readInt16LE(g-2):0;break;
case 51:if(c==64)T(7);C[c++]=g;g=p[g-2]|p[g-1]<<8;break;
case 52:if(!c)T(8);g=C[--c];break;
case 64:case 65:b=D[s-1];if(b>>8)T(6);e&1?(M[b]=D[s-2],s-=2):D[s-1]=M[b];break;
case 80:a=D[--s]+"";if(u+a.length>L)T(11);for(i=0;a[i];)O[u++]=a.charCodeAt(i++);break;
case 81:if(u==L)T(11);O[u++]=D[--s]&255;break;
case 82:D[s++]=q[j++]??-1;break;
case 83:T(D[--s]&255);
default:b=D[--s];a=D[s-1];x=a>>>0;y=b>>>0;
if(e%19<4&!b)T(4);
D[s-1]=[a+b,a-b,Math.imul(a,b),a/b,a%b,x/y,x%y,,a&b,a|b,a^b,,a<<b,a>>b,a>>>b,,a==b,a<b][e-16]??(x<y);
}
}
}catch(z){
return[O.slice(0,u),z];
}
}
const{MAKEFUN_INPUT_DIR:I="/input",MAKEFUN_OUTPUT_DIR:Y="/output"}=process.env,{readdirSync:R,readFileSync:G,writeFileSync:W,mkdirSync:K}=F;
for(const d of R(I)){
const b=I+"/"+d,[o,z]=run(G(b+"/program.bin"),G(b+"/input.bin")),h=Y+"/"+d;
K(h,{recursive:true});
W(h+"/stdout.bin",o);
W(h+"/exit.txt",z+"\n");
}
