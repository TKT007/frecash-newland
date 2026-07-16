!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):a("object"==typeof exports?require("jquery"):jQuery)}(function(a){var b,c=navigator.userAgent,d=/iphone/i.test(c),e=/chrome/i.test(c),f=/android/i.test(c);a.mask={definitions:{n:"[0-9]"},autoclear:!0,dataName:"rawMaskFn",placeholder:"*"},a.fn.extend({caret:function(a,b){var c;if(0!==this.length&&!this.is(":hidden"))return"number"==typeof a?(b="number"==typeof b?b:a,this.each(function(){this.setSelectionRange?this.setSelectionRange(a,b):this.createTextRange&&(c=this.createTextRange(),c.collapse(!0),c.moveEnd("character",b),c.moveStart("character",a),c.select())})):(this[0].setSelectionRange?(a=this[0].selectionStart,b=this[0].selectionEnd):document.selection&&document.selection.createRange&&(c=document.selection.createRange(),a=0-c.duplicate().moveStart("character",-1e5),b=a+c.text.length),{begin:a,end:b})},unmask:function(){return this.trigger("unmask")},mask:function(c,g){var h,i,j,k,l,m,n,o;if(!c&&this.length>0){h=a(this[0]);var p=h.data(a.mask.dataName);return p?p():void 0}return g=a.extend({autoclear:a.mask.autoclear,placeholder:a.mask.placeholder,completed:null},g),i=a.mask.definitions,j=[],k=n=c.length,l=null,a.each(c.split(""),function(a,b){"?"==b?(n--,k=a):i[b]?(j.push(new RegExp(i[b])),null===l&&(l=j.length-1),k>a&&(m=j.length-1)):j.push(null)}),this.trigger("unmask").each(function(){function h(){if(g.completed){for(var a=l;m>=a;a++)if(j[a]&&C[a]===p(a))return;g.completed.call(B)}}function p(a){return g.placeholder.charAt(a<g.placeholder.length?a:0)}function q(a){for(;++a<n&&!j[a];);return a}function r(a){for(;--a>=0&&!j[a];);return a}function s(a,b){var c,d;if(!(0>a)){for(c=a,d=q(b);n>c;c++)if(j[c]){if(!(n>d&&j[c].test(C[d])))break;C[c]=C[d],C[d]=p(d),d=q(d)}z(),B.caret(Math.max(l,a))}}function t(a){var b,c,d,e;for(b=a,c=p(a);n>b;b++)if(j[b]){if(d=q(b),e=C[b],C[b]=c,!(n>d&&j[d].test(e)))break;c=e}}function u(){var a=B.val(),b=B.caret();if(o&&o.length&&o.length>a.length){for(A(!0);b.begin>0&&!j[b.begin-1];)b.begin--;if(0===b.begin)for(;b.begin<l&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}else{for(A(!0);b.begin<n&&!j[b.begin];)b.begin++;B.caret(b.begin,b.begin)}h()}function v(){A(),B.val()!=E&&B.change()}function w(a){if(!B.prop("readonly")){var b,c,e,f=a.which||a.keyCode;o=B.val(),8===f||46===f||d&&127===f?(b=B.caret(),c=b.begin,e=b.end,e-c===0&&(c=46!==f?r(c):e=q(c-1),e=46===f?q(e):e),y(c,e),s(c,e-1),a.preventDefault()):13===f?v.call(this,a):27===f&&(B.val(E),B.caret(0,A()),a.preventDefault())}}function x(b){if(!B.prop("readonly")){var c,d,e,g=b.which||b.keyCode,i=B.caret();if(!(b.ctrlKey||b.altKey||b.metaKey||32>g)&&g&&13!==g){if(i.end-i.begin!==0&&(y(i.begin,i.end),s(i.begin,i.end-1)),c=q(i.begin-1),n>c&&(d=String.fromCharCode(g),j[c].test(d))){if(t(c),C[c]=d,z(),e=q(c),f){var k=function(){a.proxy(a.fn.caret,B,e)()};setTimeout(k,0)}else B.caret(e);i.begin<=m&&h()}b.preventDefault()}}}function y(a,b){var c;for(c=a;b>c&&n>c;c++)j[c]&&(C[c]=p(c))}function z(){B.val(C.join(""))}function A(a){var b,c,d,e=B.val(),f=-1;for(b=0,d=0;n>b;b++)if(j[b]){for(C[b]=p(b);d++<e.length;)if(c=e.charAt(d-1),j[b].test(c)){C[b]=c,f=b;break}if(d>e.length){y(b+1,n);break}}else C[b]===e.charAt(d)&&d++,k>b&&(f=b);return a?z():k>f+1?g.autoclear||C.join("")===D?(B.val()&&B.val(""),y(0,n)):z():(z(),B.val(B.val().substring(0,f+1))),k?b:l}var B=a(this),C=a.map(c.split(""),function(a,b){return"?"!=a?i[a]?p(b):a:void 0}),D=C.join(""),E=B.val();B.data(a.mask.dataName,function(){return a.map(C,function(a,b){return j[b]&&a!=p(b)?a:null}).join("")}),B.one("unmask",function(){B.off(".mask").removeData(a.mask.dataName)}).on("focus.mask",function(){if(!B.prop("readonly")){clearTimeout(b);var a;E=B.val(),a=A(),b=setTimeout(function(){B.get(0)===document.activeElement&&(z(),a==c.replace("?","").length?B.caret(0,a):B.caret(a))},10)}}).on("blur.mask",v).on("keydown.mask",w).on("keypress.mask",x).on("input.mask paste.mask",function(){B.prop("readonly")||setTimeout(function(){var a=A(!0);B.caret(a),h()},0)}),e&&f&&B.off("input.mask").on("input.mask",u),A()})}})});

if (typeof adc !== 'object') var adc = {};

!function(){
adc.phone = {
  setting: {
    phone: '[name="phone"]',
    country: 'select#country_code_selector',
    ccDef: ''
  },
  db: {
    ac: '+247nnnn',
    ad: '+376nnnnnn',
    ae: '+971nnnnnnnn',
    af: '+93nnnnnnnnn',
    ag: '+1268nnnnnnn',
    ai: '+1264nnnnnnn',
    al: '+355nnnnnnnnn',
    am: '+374nnnnnnnn',
    an: '+599nnnnnnn?n,',
    ao: '+244nnnnnnnnn',
    aq: '+6721nnnnn',
    ar: '+54nnnnnnnnnn',
    as: '+1684nnnnnnn',
    at: '+43nnnnnnnnnn',
    au: '+61nnnnnnnnn',
    aw: '+297nnnnnnn',
    az: '+994nnnnnnnnn',
    ba: '+387nnnnnn?n',
    bb: '+1246nnnnnnn',
    bd: '+880nnnnnnnn',
    be: '+32nnnnnnnnn',
    bf: '+226nnnnnnnn',
    bg: '+359nnnnnnnnn',
    bh: '+973nnnnnnnn',
    bi: '+257nnnnnnnn',
    bj: '+229nnnnnnnn',
    bm: '+1441nnnnnnn',
    bn: '+673nnnnnnn',
    bo: '+591nnnnnnnn',
    br: '+55nnnnnnnnnn',
    bs: '+1242nnnnnnn',
    bt: '+975nnnnnnn?n',
    bw: '+267nnnnnnnn',
    by: '+375nnnnnnnnn',
    bz: '+501nnnnnnn',
    ca: '+1nnnnnnnnnn',
    cd: '+243nnnnnnnnn',
    cf: '+236nnnnnnnn',
    cg: '+242nnnnnnnnn',
    ch: '+41nnnnnnnnn',
    ci: '+225nnnnnnnn',
    ck: '+682nnnnn',
    cl: '+56nnnnnnnnn',
    cm: '+237nnnnnnnn',
    cn: '+86nnnnnnnn?nnnn',
    co: '+57nnnnnnnnnn',
    cr: '+506nnnnnnnn',
    cu: '+53nnnnnnnn',
    cv: '+238nnnnnnn',
    cw: '+599nnnnnnn',
    cy: '+357nnnnnnnn',
    cz: '+420nnnnnnnnn',
    de: '+49nnnnnn?nnnnn',
    dj: '+253nnnnnnnn',
    dk: '+45nnnnnnnn',
    dm: '+1767nnnnnnn',
    do: '+18nnnnnnnnn',
    dz: '+213nnnnnnnnn',
    ec: '+593nnnnnnnn?n',
    ee: '+372nnnnnnn?n',
    eg: '+20nnnnnnnnnn',
    er: '+291nnnnnnn',
    es: '+34nnnnnnnnn',
    et: '+251nnnnnnnnn',
    fi: '+358nnnnnnnnnn',
    fj: '+679nnnnnnn',
    fk: '+500nnnnn',
    fm: '+691nnnnnnn',
    fo: '+298nnnnnn',
    fr: '+33nnnnnnnnn',
    ga: '+241nnnnnnn',
    gb: '+44nnnnnnnnnn',
    gd: '+1473nnnnnnn',
    ge: '+995nnnnnnnnn',
    gf: '+594nnnnnnnnn',
    gh: '+233nnnnnnnnn',
    gi: '+350nnnnnnnn',
    gl: '+299nnnnnn',
    gm: '+220nnnnnnn',
    gn: '+224nnnnnnnn',
    gp: '+590nnnnnnnnn',
    gq: '+240nnnnnnnnn',
    gr: '+30nnnnnnnnnn',
    gt: '+502nnnnnnnn',
    gu: '+1671nnnnnnn',
    gw: '+245nnnnnnn',
    gy: '+592nnnnnnn',
    hk: '+852nnnnnnnn',
    hn: '+504nnnnnnnn',
    hr: '+385nnnnnnnn?nn',
    ht: '+509nnnnnnnn',
    hu: '+36nnnnnnnnn',
    id: '+62nnnnnnn?nnnn',
    ie: '+353nnnnnnnnn',
    il: '+972nnnnnnnn?n',
    in: '+91nnnnnnnnnn',
    io: '+246nnnnnnn',
    iq: '+964nnnnnnnnnn',
    ir: '+98nnnnnnnnnn',
    is: '+354nnnnnnn',
    it: '+39nnnnnnnnnn',
    je: '+441534nnnnnnn',
    jm: '+1876nnnnnnn',
    jo: '+962nnnnnnnnn',
    jp: '+81nnnnnnnnn?n',
    ke: '+254nnnnnnnnn',
    kg: '+996nnnnnnnnn',
    kh: '+855nnnnnnnn',
    ki: '+686nnnnn',
    km: '+269nnnnnnn',
    kn: '+1869nnnnnnn',
    kp: '+850nnnnnn?nnnnnnnnnnn',
    kr: '+82nnnnnnnnn',
    kw: '+965nnnnnnnn',
    ky: '+1345nnnnnnn',
    kz: '+7nnnnnnnnnn',
    la: '+856nnnnnnnn?nn',
    lb: '+961nnnnnnnn',
    lc: '+1758nnnnnnn',
    li: '+423nnnnnnnnnn',
    lk: '+94nnnnnnnnn',
    lr: '+231nnnnnnnn',
    ls: '+266nnnnnnnn',
    lt: '+370nnnnnnnn',
    lu: '+352nnnnnnnnn',
    lv: '+371nnnnnnnn',
    ly: '+218nnnnnnnn?n',
    ma: '+212nnnnnnnnn',
    mc: '+377nnnnnnnn?n',
    md: '+373nnnnnnnn',
    me: '+382nnnnnnnn',
    mg: '+261nnnnnnnnn',
    mh: '+692nnnnnnn',
    mk: '+389nnnnnnnn',
    ml: '+223nnnnnnnn',
    mm: '+95nnnnnn?nn',
    mn: '+976nnnnnnnn',
    mo: '+853nnnnnnnn',
    mp: '+1670nnnnnnn',
    mq: '+596nnnnnnnnn',
    mr: '+222nnnnnnnn',
    ms: '+1664nnnnnnn',
    mt: '+356nnnnnnnn',
    mu: '+230nnnnnnn',
    mv: '+960nnnnnnn',
    mw: '+265nnnnnnn?nn',
    mx: '+52nnnnnnnnnn',
    my: '+60nnnnnnn?nn',
    mz: '+258nnnnnnnn',
    na: '+264nnnnnnnnn',
    nc: '+687nnnnnn',
    ne: '+227nnnnnnnn',
    nf: '+6723nnnnn',
    ng: '+234nnnnnnn?nnn',
    ni: '+505nnnnnnnn',
    nl: '+31nnnnnnnnn',
    no: '+47nnnnnnnn',
    np: '+977nnnnnnnn',
    nr: '+674nnnnnnn',
    nu: '+683nnnn',
    nz: '+64nnnnnnnn?nn',
    om: '+968nnnnnnnn',
    pa: '+507nnnnnnn?n',
    pe: '+51nnnnnnnn?n',
    pf: '+689nnnnnn',
    pg: '+675nnnnnnnn',
    ph: '+63nnnnnnnnnn',
    pk: '+92nnnnnnnnnn',
    pl: '+48nnnnnnnnn',
    pm: '+508nnnnnn',
    ps: '+970nnnnnnnnn',
    pt: '+351nnnnnnnnn',
    pw: '+680nnnnnnn',
    py: '+595nnnnnnnnn',
    qa: '+974nnnnnnnn',
    re: '+262nnnnnnnnn',
    ro: '+40nnnnnnnnn',
    rs: '+381nnnnnnnnn',
    ru: '+7nnnnnnnnnn',
    rw: '+250nnnnnnnnn',
    sa: '+966nnnnnnnn?n',
    sb: '+677nnnnn?nn',
    sc: '+248nnnnnnn',
    sd: '+249nnnnnnnnn',
    se: '+46nnnnnnnnn',
    sg: '+65nnnnnnnn',
    sh: '+290nnnn',
    si: '+386nnnnnnnn',
    sk: '+421nnnnnnnnn',
    sl: '+232nnnnnnnn',
    sm: '+378nnnnnnnnnn',
    sn: '+221nnnnnnnnn',
    so: '+252nnnnnnn?n',
    sr: '+597nnnnnn?n',
    ss: '+211nnnnnnnnn',
    st: '+239nnnnnnn',
    sv: '+503nnnnnnnn',
    sx: '+1721nnnnnnn',
    sy: '+963nnnnnnnnn',
    sz: '+268nnnnnnnn',
    tc: '+1649nnnnnnn',
    td: '+235nnnnnnnn',
    tg: '+228nnnnnnnn',
    th: '+66nnnnnnnn?n',
    tj: '+992nnnnnnnnn',
    tk: '+690nnnn',
    tl: '+670nnnnnnn?n',
    tm: '+993nnnnnnnn',
    tn: '+216nnnnnnnn',
    to: '+676nnnnn',
    tr: '+905nnnnnnnnn',
    tt: '+1868nnnnnnn',
    tv: '+688nnnnn?n',
    tw: '+886nnnnnnnn?n',
    tz: '+255nnnnnnnnn',
    ua: '+380nnnnnnnnn',
    ug: '+256nnnnnnnnn',
    us: '+1nnnnnnnnnn',
    uy: '+598nnnnnnnn',
    uz: '+998nnnnnnnnn',
    va: '+3906698nnnnn',
    vc: '+1784nnnnnnn',
    ve: '+58nnnnnnnnnn',
    vg: '+1284nnnnnnn',
    vi: '+1340nnnnnnn',
    vn: '+84nnnnnnnnn?n',
    vu: '+678nnnnn?nn',
    wf: '+681nnnnnn',
    ws: '+685nnnnnn',
    ye: '+967nnnnnnn?nn',
    yt: '+262nnnnnnnnn',
    xk: '+383nnnnnnn?nnn',
    za: '+27nnnnnnnnn',
    zm: '+260nnnnnnnnn',
    zw: '+263nnnnnnn'
  },
  noErorr: function(number){
    var _t = this,
    numGood = '';
    if (number !== '') {
      number = number.replace(/[+()\s-]/g, '') + '';
      if (/^\d*$/.test(number)) {
        if (_t.cc === 'in') {
          if (/91[6789]/.test(number.substr(0, 3))) {
            numGood = number;
          } else if (/[6789]/.test(number.substr(0, 1))) {
            numGood = '91' + number;
          } else if(/0[6789]/.test(number.substr(0, 2))){
            numGood = '91' + number.substr(1);
          }
          if(numGood.length === 12) return numGood;
        } else if(_t.cc === 'tr'){
          if (/905/.test(number.substr(0, 3))) { 
            numGood = number;
          } else if (/5/.test(number.substr(0, 1))) {
            numGood = '90' + number;
          } else if(/05/.test(number.substr(0, 2))){
            numGood = '90' + number.substr(1);
          } else if(/00905/.test(number.substr(0, 5))){
            numGood = number.substr(2);
          } else if(/0905/.test(number.substr(0, 4))){
            numGood = number.substr(1);
          } else if(/9005/.test(number.substr(0, 4))){
            numGood = '905'+ number.substr(4);
          }
          if(numGood.length === 12) return numGood;
        } else if(_t.cc === 'pt'){
          if (/3519/.test(number.substr(0, 4))) { 
            numGood = number;
          } else if (/03519/.test(number.substr(0, 5))) {
            numGood = number.substr(1);
          } else if(/09/.test(number.substr(0, 2))){
            numGood = '351' + number.substr(1);
          } else if(/9/.test(number.substr(0, 1))){
            numGood = '351' + number;
          } else if(/003519/.test(number.substr(0, 6))){
            numGood = number.substr(2);
          }
          if(numGood.length === 12) return numGood;
        } else{
          numGood = number;
        }
      }
    }
    return numGood;
  },
  genMask: function () {
    var _t = this;
    _t.phone.unmask();
    _t.phone.val('');

    if (_t.db[_t.cc]) {
      _t.phone.mask(_t.db[_t.cc]);
    }
  },
  init: function () {
    var _t = this,
    _s = _t.setting;
    _t['phone'] = $(_s.phone);
    _t['country'] = $(_s.country);
    _t['cc'] = (_s.ccDef !== '') ? _s.ccDef.toLowerCase() : typeof ip_ccode !== 'undefined' ? ip_ccode.toLowerCase() : typeof _t.country === 'object' && typeof _t.country.find('[selected]').val() !== 'undefined' ? _t.country.find('[selected]').val().toLowerCase() : '';

    _t.genMask();

    if (_s.ccDef === '') {
      _t.country.on('change', function (e) {
        _t.cc = this.value.toLowerCase();
        _t.genMask();
        _t.country.each(function () {
          $(this).find('[value=' + _t.cc + ']').prop('selected', true);
        });
      });
    }

    _t.phone.on('paste', function (e) {
      if (_t.db[_t.cc]) {
        e.preventDefault();
        try {
          _t.phone.unmask();
          _t.phone.mask(_t.db[_t.cc]).val(_t.noErorr((window.clipboardData || e.clipboardData || e.originalEvent.clipboardData).getData('text')));
        } catch (e) {
        }
      }
    });
  }
};
}();

$(function () {
  adc.phone.init();
});