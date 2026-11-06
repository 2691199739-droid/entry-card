/* 入境卡助手 · 官方表单填表器 fill.js — 由 publish-build.py 自动生成，勿手改
   用法：在官方申报表单页点右下角「自动填表」按钮（Stay 扩展加载本文件）→ 粘贴填表码 → 自动填入 */
function bmMy(d){
  var banner=null;
  function note(m,s){
    if(!banner){banner=document.createElement('div');banner.style.cssText='position:fixed;left:14px;bottom:14px;z-index:2147483647;background:#0B2447;color:#fff;font:13px/1.6 system-ui,-apple-system,sans-serif;padding:12px 16px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.35);max-width:360px';document.body.appendChild(banner)}
    banner.textContent=m;clearTimeout(banner._t);
    if(!s)banner._t=setTimeout(function(){banner.remove();banner=null},8000);
  }
  function g(i){return document.getElementById(i)}
  function st(i,v){var e=g(i);if(!e||!v)return 0;e.value=v;e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));return 1}
  function ss(i,v){var e=g(i);if(!e||!v)return 0;var val=String(v).toUpperCase();var o=e.options;for(var j=0;j<o.length;j++){var ov=String(o[j].value).toUpperCase();var ot=String(o[j].text).replace(/\s+/g,' ').toUpperCase();if(ov===val||ot.indexOf(val)>-1){e.value=o[j].value;e.dispatchEvent(new Event('change',{bubbles:true}));return 1}}return 0}
  function fmt(iso){if(!iso)return '';var p=String(iso).split('-');return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:String(iso)}
  function mapData(x){return{name:x.name,passNo:x.passport,dob:fmt(x.dob),nationality:x.nationality,pob:x.pob,sex:x.sex==='Male'?'1':(x.sex==='Female'?'2':''),passExp:fmt(x.passportExp),email:x.email,confirmEmail:x.email,region:x.ccode,mobile:x.mobile,arr:fmt(x.arrival),dep:fmt(x.departure),vessel:x.flight,mode:x.mode==='Air'?'1':(x.mode==='Land'?'2':(x.mode==='Sea'?'3':'')),embark:x.lastPort,stay:x.accommodation,addr1:x.address,addr2:x.address2||'',state:x.state,city:x.city,postcode:x.postcode}}
  function directFill(D){
    var n=0,miss=[];
    var T1=[['name',D.name],['passNo',D.passNo],['dob',D.dob],['passExpDte',D.passExp],['email',D.email],['confirmEmail',D.confirmEmail],['mobile',D.mobile],['arrDt',D.arr],['depDt',D.dep],['vesselNm',D.vessel],['accommodationAddress1',D.addr1],['accommodationAddress2',D.addr2],['accommodationPostcode',D.postcode]];
    var S1=[['nationality',D.nationality],['pob',D.pob],['sex',D.sex],['trvlMode',D.mode],['embark',D.embark],['accommodationStay',D.stay]];
    T1.forEach(function(p){if(p[1]){if(st(p[0],p[1]))n++;else miss.push(p[0])}});
    S1.forEach(function(p){if(p[1]){if(ss(p[0],p[1]))n++;else miss.push(p[0])}});
    return new Promise(function(res){
      setTimeout(function(){
        if(D.region&&g('region')&&!g('region').value){if(ss('region',D.region))n++}
        if(!D.state){res({n:n,miss:miss});return}
        if(ss('accommodationState',D.state)){
          n++;
          var tries=0,cok=0,counted=false;
          var t=setInterval(function(){
            tries++;
            if(!cok&&D.city)cok=ss('accommodationCity',D.city);
            if(cok&&!counted){counted=true;n++}
            if(cok||tries>=12){
              clearInterval(t);
              if(!cok&&D.postcode&&g('accommodationPostcode')&&!g('accommodationPostcode').value){if(st('accommodationPostcode',D.postcode))n++}
              if(!cok)miss.push('accommodationCity');
              res({n:n,miss:miss});
            }
          },800);
        }else{miss.push('accommodationState');res({n:n,miss:miss})}
      },900);
    });
  }
  function genericFill(D,x){
    var A=[['confirm email',D.email],['email address',D.email],['passport no',D.passNo],['passport expiry',D.passExp],['date of birth',D.dob],['place of birth',D.pob],['nationality',D.nationality],['sex',x.sex],['country code',D.region],['mobile',D.mobile],['arrival',D.arr],['departure',D.dep],['flight',D.vessel],['mode of travel',x.mode],['last port',D.embark],['accommodation',x.accommodation],['address',D.addr1],['state',x.state],['postcode',D.postcode],['city',x.city],['name',D.name]].filter(function(p){return p[1]});
    var I=[].slice.call(document.querySelectorAll('input:not([type=hidden]):not([type=button]):not([type=submit]):not([type=reset]):not([type=radio]):not([type=checkbox]):not([type=file]):not([type=image]),select,textarea'));
    var U=[],n=0;
    function T(e){
      var t=[],l;
      if(e.id){try{l=document.querySelector('label[for="'+e.id+'"]');if(l)t.push(l.textContent)}catch(x1){}}
      try{l=e.closest('label');if(l)t.push(l.textContent)}catch(x2){}
      var td=e.closest('td');if(td&&td.previousElementSibling)t.push(td.previousElementSibling.textContent);
      if(e.placeholder)t.push(e.placeholder);
      if(e.getAttribute('aria-label'))t.push(e.getAttribute('aria-label'));
      t.push(e.name||'');t.push(e.id||'');
      return t.join(' ').toLowerCase();
    }
    function S(e,v){
      if(e.tagName==='SELECT'){
        var o=e.options;
        for(var j=0;j<o.length;j++){
          if(o[j].text.toLowerCase().indexOf(String(v).toLowerCase())>-1){e.value=o[j].value;e.dispatchEvent(new Event('change',{bubbles:true}));return 1}
        }
        return 0;
      }
      e.value=v;
      if(e.type==='date'&&!e.value)e.value=String(v).split('/').reverse().join('-');
      e.dispatchEvent(new Event('input',{bubbles:true}));
      e.dispatchEvent(new Event('change',{bubbles:true}));
      return 1;
    }
    A.forEach(function(p){
      var a=p[0],v=p[1];
      for(var i=0;i<I.length;i++){
        var e=I[i];
        if(U.indexOf(e)>-1)continue;
        if(T(e).indexOf(a)>-1){U.push(e);n+=S(e,v);break}
      }
    });
    return Promise.resolve({n:n,miss:[]});
  }
  function doFill(){
    var D=mapData(d);
    note('MDAC 助手正在自动填入…',true);
    var p=(g('name')||g('passNo')||g('arrDt')||g('nationality'))?directFill(D):genericFill(D,d);
    p.then(function(r){
      var m='MDAC 助手：已自动填入 '+r.n+' 项';
      if(r.miss&&r.miss.length)m+='；未填入：'+r.miss.join(', ')+'，请手动补填';
      m+='。请核对后自行提交。';
      note(m,true);
    });
  }
  var tries=0;
  var t=setInterval(function(){
    tries++;
    if(g('name')||g('passNo')||document.querySelector('form[name="permohonan"]')){clearInterval(t);doFill();return}
    if(tries===1){note('MDAC 助手已就绪：等待官方表单加载完成后自动填入…',true)}
    if(tries>=30){clearInterval(t);note('MDAC 助手：约 45 秒内未检测到表单，请确认已打开 MDAC 申报页后重新点「自动填表」按钮',true)}
  },1500);
}
function bmTh(d){
  var banner=null;
  function note(m,s){
    if(!banner){banner=document.createElement('div');banner.style.cssText='position:fixed;left:14px;bottom:14px;z-index:2147483647;background:#0B2447;color:#fff;font:13px/1.6 system-ui,-apple-system,sans-serif;padding:12px 16px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.35);max-width:360px';document.body.appendChild(banner)}
    banner.textContent=m;clearTimeout(banner._t);
    if(!s)banner._t=setTimeout(function(){banner.remove();banner=null},8000);
  }
  function fmt(iso){if(!iso)return '';var p=String(iso).split('-');return p.length===3?p[2]+'/'+p[1]+'/'+p[0]:String(iso)}
  function fcAny(names){
    for(var i=0;i<names.length;i++){
      var el=document.querySelector('input[formcontrolname="'+names[i]+'"], textarea[formcontrolname="'+names[i]+'"]');
      if(el)return el;
      var host=document.querySelector('[formcontrolname="'+names[i]+'"]');
      if(host){var inp=host.querySelector('input, textarea');if(inp)return inp}
    }
    return null;
  }
  function vis(el){if(!el)return false;var r=el.getBoundingClientRect();return r.width>=10&&r.height>=10}
  function setNg(el,v){if(!el)return 0;try{el.focus()}catch(e){}el.value=v;el.dispatchEvent(new Event('input',{bubbles:true}));el.dispatchEvent(new Event('change',{bubbles:true}));try{el.blur()}catch(e2){}return 1}
  function pick(val,cb,tries){
    var n=0,T=tries||10;
    var t=setInterval(function(){
      n++;
      var cands=[].slice.call(document.querySelectorAll('mat-option,.mat-option,sit-option,[class*="option"]')).filter(function(o){
        if(!vis(o))return false;
        var s=(o.textContent||'').trim();
        if(!s||s.length>60)return false;
        return s.toUpperCase().indexOf(String(val).toUpperCase())>-1;
      });
      if(cands.length){
        cands.sort(function(a,b){return (a.textContent||'').trim().length-(b.textContent||'').trim().length});
        cands[0].click();clearInterval(t);cb(1);return;
      }
      if(n>=T){clearInterval(t);cb(0)}
    },320);
  }
  function ana(names,vals,cb){
    var el=fcAny(names);
    if(!el)return cb(0);
    try{el.scrollIntoView({block:'center'})}catch(e){}
    try{el.focus()}catch(e2){}
    el.value=vals[0];
    el.dispatchEvent(new Event('input',{bubbles:true}));
    pick(vals[0],function(ok){
      if(ok)return cb(1);
      if(vals.length>1){
        el.value=vals[1];
        el.dispatchEvent(new Event('input',{bubbles:true}));
        pick(vals[1],function(ok2){
          if(ok2)return cb(1);
          el.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',keyCode:13,bubbles:true}));
          cb(0);
        },6);
        return;
      }
      el.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',keyCode:13,bubbles:true}));
      cb(0);
    });
  }
  function optRow(name,val,cb){
    var row=document.querySelector('[formcontrolname="'+name+'"]');
    if(!row)return cb(0);
    try{row.scrollIntoView({block:'center'})}catch(e){}
    var kids=[].slice.call(row.querySelectorAll('*')).filter(function(o){
      if(!vis(o))return false;
      var s=(o.textContent||'').trim();
      if(!s||s.length>40)return false;
      return s.toUpperCase().indexOf(String(val).toUpperCase())>-1;
    });
    if(kids.length){
      kids.sort(function(a,b){return (a.textContent||'').trim().length-(b.textContent||'').trim().length});
      kids[0].click();setTimeout(function(){cb(1)},250);return;
    }
    cb(0);
  }
  function sel(name,vals,cb){
    var host=document.querySelector('[formcontrolname="'+name+'"]');
    if(!host)return cb(0);
    try{host.scrollIntoView({block:'center'})}catch(e){}
    host.click();
    setTimeout(function(){
      pick(vals[0],function(ok){
        if(ok)return cb(1);
        if(vals.length>1){
          host.click();
          setTimeout(function(){pick(vals[1],function(ok2){cb(ok2)},8)},400);
          return;
        }
        cb(0);
      },8);
    },400);
  }
  function datePick(names,dmy,cb){
    var el=fcAny(names);
    if(!el)return cb(0);
    try{el.scrollIntoView({block:'center'})}catch(e){}
    try{el.focus()}catch(e2){}
    el.value=dmy;
    el.dispatchEvent(new Event('input',{bubbles:true}));
    el.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',keyCode:13,bubbles:true}));
    el.dispatchEvent(new Event('change',{bubbles:true}));
    try{el.blur()}catch(e3){}
    setTimeout(function(){cb(el.value?1:0)},500);
  }
  function seq(steps,done){(function next(i){if(i>=steps.length){done();return}steps[i](function(){next(i+1)})})(0)}
  function stepperNext(cb){
    var btn=document.querySelector('button[matsteppernext], .next-button:not([disabled])');
    if(btn){try{btn.scrollIntoView({block:'center'})}catch(e){}btn.click()}
    setTimeout(cb,900);
  }
  var TH_MON=['JANUARY','FEBRUARY','MARCH','APRIL','MAY','JUNE','JULY','AUGUST','SEPTEMBER','OCTOBER','NOVEMBER','DECEMBER'];
  function thaiFill(){
    var n=0,miss=[];
    function ok(x,name){if(x)n++;else miss.push(name)}
    ok(setNg(fcAny(['familyName']),(d.surName||d.name||'').toUpperCase()),'familyName');
    ok(setNg(fcAny(['firstName']),(d.givenName||'').toUpperCase()),'firstName');
    ok(setNg(fcAny(['passportNo']),d.passport||''),'passportNo');
    if(d.occupation)ok(setNg(fcAny(['occupation']),String(d.occupation).toUpperCase()),'occupation');
    if(d.ccode)ok(setNg(fcAny(['phoneCode']),d.ccode),'phoneCode');
    if(d.mobile)ok(setNg(fcAny(['phoneNo']),d.mobile),'phoneNo');
    if(d.flight)ok(setNg(fcAny(['flightNo']),d.flight),'flightNo');
    if(d.deptflight)ok(setNg(fcAny(['deptFlightNo']),d.deptflight),'deptFlightNo');
    if(d.postcode)ok(setNg(fcAny(['accPostCode']),d.postcode),'accPostCode');
    if(d.accAddress||d.address)ok(setNg(fcAny(['accAddress']),(d.accAddress||d.address).slice(0,215)),'accAddress');
    if(d.email)ok(setNg(fcAny(['sendTo']),d.email),'sendTo');
    var dob=String(d.dob||'').split('-');
    var steps=[];
    if(dob.length===3){
      steps.push(function(cb){ana(['bdDateYear','bdYear'],[dob[0]],function(x){ok(x,'出生年');cb()})});
      steps.push(function(cb){ana(['bdDateMonth','bdMonth'],[TH_MON[+dob[1]-1]||'',dob[1]],function(x){ok(x,'出生月');cb()})});
      steps.push(function(cb){ana(['bdDateDay','bdDay'],[dob[2]],function(x){ok(x,'出生日');cb()})});
    }
    steps.push(function(cb){ana(['nationalityDesc'],['CHINA'],function(x){ok(x,'nationality');cb()})});
    steps.push(function(cb){optRow('gender',d.sex==='Female'?'FEMALE':'MALE',function(x){ok(x,'gender');cb()})});
    steps.push(function(cb){stepperNext(cb)});
    steps.push(function(cb){datePick(['arrDate'],fmt(d.arrival),function(x){ok(x,'arrDate');cb()})});
    steps.push(function(cb){datePick(['deptDate'],fmt(d.departure),function(x){ok(x,'deptDate');cb()})});
    steps.push(function(cb){optRow('traModeId',d.mode?String(d.mode).toUpperCase():'AIR',function(x){ok(x,'traMode(出行方式)');cb()})});
    steps.push(function(cb){optRow('deptTraModeId',d.mode?String(d.mode).toUpperCase():'AIR',function(x){ok(x,'deptTraMode(离境方式)');cb()})});
    if(d.purpose)steps.push(function(cb){sel('traPurposeId',[d.purpose],function(x){ok(x,'traPurpose(旅行目的)');cb()})});
    if(d.lastPortName)steps.push(function(cb){ana(['countryBoardDesc'],[String(d.lastPortName).toUpperCase()],function(x){ok(x,'countryBoard(出发国家)');cb()})});
    steps.push(function(cb){stepperNext(cb)});
    var accKw=d.accommodation==='02'?['FRIEND','RELATIVE']:(d.accommodation==='99'?['OTHER']:['HOTEL']);
    steps.push(function(cb){sel('accTypeId',accKw,function(x){ok(x,'accType(住宿类型)');cb()})});
    if(d.state)steps.push(function(cb){ana(['accProvinceDesc'],[d.state],function(x){ok(x,'accProvince(府)');cb()})});
    if(d.city)steps.push(function(cb){ana(['accDistrictDesc','accDistrict'],[d.city],function(x){ok(x,'accDistrict(县/区)');cb()})});
    seq(steps,function(){
      var m='TDAC 助手：已自动填入 '+n+' 项';
      if(miss.length)m+='；未自动选上：'+miss.join('、')+'，请手动点选补齐';
      m+='。健康申报与声明勾选请自行确认，核对无误后自行提交。';
      note(m,true);
    });
  }
  var ticks=0,filled=false,readyShown=false;
  var timer=null;
  function tryFill(){
    if(filled)return;
    ticks++;
    if(ticks>400){clearInterval(timer);return}
    var form=document.querySelector('input[formcontrolname="passportNo"], [formcontrolname="passportNo"]');
    if(!form){
      if(!readyShown){readyShown=true;note('TDAC 助手已就绪：请在页面完成人机验证并点击 Arrival Card，表单打开后自动填入',true)}
      return;
    }
    filled=true;
    note('TDAC 助手正在自动填入…',true);
    setTimeout(thaiFill,600);
  }
  timer=setInterval(tryFill,1500);
  window.addEventListener('hashchange',function(){setTimeout(tryFill,800)});
  tryFill();
}
(function(){
  function bail(m){try{alert(m)}catch(e){}}
  window.__entryFill=function(){
    try{
      if(!document.body){bail('页面还没加载完：请等表单完全显示后再点「自动填表」按钮');return}
      var c=null;
      try{c=prompt('入境卡填表：请长按粘贴填表码（已在助手页面点「生成填表码」复制）','')}catch(e){}
      if(!c||!String(c).trim())return;
      var t=String(c).trim();
      var d=null;
      try{d=JSON.parse(decodeURIComponent(escape(atob(t))))}catch(e){}
      if(!d||!d.passport){bail('填表码无效：请回到入境卡助手页面，重新点「生成填表码」复制后再试');return}
      var isMY=!!(document.getElementById('name')&&document.getElementById('passNo'));
      var isTH=false;
      try{isTH=!!document.querySelector('[formcontrolname=passportNo]')}catch(e){}
      if(d.dest==='TH'?!isTH:!isMY){bail('当前页面不是申报表单页：请先在官网点 REGISTER / Apply 按钮进入表单页，等表单完全显示后再点右下角「自动填表」按钮');return}
      (d.dest==='TH'?bmTh:bmMy)(d);
    }catch(e){bail('填表脚本出错：'+(e&&e.message?e.message:'未知错误')+'。请截图反馈给管理员')}
  };
  if(window.__entryFillLoaded){window.__entryFill()}else{window.__entryFillLoaded=1;window.__entryFill()}
})();
