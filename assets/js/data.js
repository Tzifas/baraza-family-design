/* ============================================================
   Baraza Family — sample data
   Every name here is invented. This file is the prototype's
   in-memory database: it seeds the screens and gets mutated as
   the reviewer approves, rejects and toggles things.
   ============================================================ */
(function () {
  'use strict';

  var TODAY = new Date('2026-11-13T09:00:00+03:00');

  function d(s) { return s ? new Date(s + 'T00:00:00+03:00') : null; }

  var people = [
    { id:'p01', name:'Silas Baraza', pref:'Mzee Baraza', sex:'m', dob:'1938-06-14', dod:'2017-03-02', branch:'Bungoma', county:'Bungoma', country:'Kenya', status:'retired',
      statusDetail:'Agricultural extension officer, Bungoma',
      bio:'Worked the county’s coffee and maize plots for thirty-one years. Kept every birth, wedding and burial in a hardback book that the family still has.',
      edu:[], work:[{org:'Ministry of Agriculture, Bungoma', role:'Extension officer', from:'1962', to:'1993', current:false}] },
    { id:'p02', name:'Rebecca Baraza', pref:'Mama Rebecca', sex:'f', dob:'1942-08-30', dod:null, branch:'Bungoma', county:'Bungoma', country:'Kenya', status:'retired',
      statusDetail:'Retired nurse, Bungoma',
      bio:'Nursed at Bungoma District Hospital for twenty-nine years, and delivered a good share of the family’s own children.',
      edu:[{org:'Kenya Medical Training College', role:'Certificate in Nursing', from:'1961', to:'1964', current:false}],
      work:[{org:'Bungoma District Hospital', role:'Nurse', from:'1965', to:'1994', current:false}] },

    { id:'p03', name:'Daniel Baraza', pref:'Mr. Baraza', sex:'m', dob:'1965-02-18', dod:null, branch:'Bungoma', county:'Bungoma', country:'Kenya', status:'employed',
      statusDetail:'Teacher, Bungoma',
      bio:'Has taught biology at the same secondary school since 1991, and still marks past papers in December. Keeps this record because nobody else would.',
      edu:[{org:'Kenyatta University', role:'Bachelor of Education, Science', from:'1985', to:'1989', current:false}],
      work:[{org:'Bungoma High School', role:'Teacher of Biology', from:'1991', to:null, current:true}] },
    { id:'p04', name:'Mercy Otieno', pref:'Mercy', sex:'f', dob:'1968-06-05', dod:null, branch:'Nairobi', county:'Nairobi', country:'Kenya', status:'employed',
      statusDetail:'Pharmacist, Nairobi',
      bio:'Moved to Nairobi in 1991 and has worked in hospital pharmacy since. Keeps the family’s medical history, which everyone calls about eventually.',
      edu:[{org:'University of Nairobi', role:'Bachelor of Pharmacy', from:'1987', to:'1991', current:false}],
      work:[{org:'Kenyatta National Hospital', role:'Pharmacist', from:'1994', to:null, current:true}] },
    { id:'p05', name:'Wycliffe Baraza', pref:'Wycliffe', sex:'m', dob:'1971-09-23', dod:null, branch:'Mombasa', county:'Mombasa', country:'Kenya', status:'employed',
      statusDetail:'Marine engineer, Kenya Ports Authority',
      bio:'Works on the container cranes at the port. The one who still drives up for every family gathering, however short.',
      edu:[{org:'Technical University of Mombasa', role:'Higher Diploma, Marine Engineering', from:'1991', to:'1994', current:false}],
      work:[{org:'Kenya Ports Authority', role:'Marine engineer', from:'1996', to:null, current:true}] },
    { id:'p06', name:'Naomi Baraza', pref:'Naomi', sex:'f', dob:'1975-12-01', dod:null, branch:'Bungoma', county:'Bungoma', country:'Kenya', status:'self-employed',
      statusDetail:'Tailor, Bungoma market',
      bio:'Runs a tailoring stall at Bungoma market. Made the cloth for three family weddings, and will remind you of it.',
      edu:[], work:[{org:'Bungoma market', role:'Tailor and trader', from:'1996', to:null, current:true}] },
    { id:'p07', name:'Alice Baraza', pref:'Alice', sex:'f', dob:'1968-03-11', dod:null, branch:'Bungoma', county:'Bungoma', country:'Kenya', status:'employed',
      statusDetail:'Deputy head teacher, Bungoma',
      bio:'Married Daniel in 1988. Deputises at a primary school in town, and has the louder voice in the staffroom.',
      edu:[{org:'Kenyatta University', role:'Bachelor of Education', from:'1988', to:'1992', current:false}],
      work:[{org:'Township Primary School', role:'Deputy head teacher', from:'1994', to:null, current:true}] },
    { id:'p08', name:'Faith Baraza', pref:'Faith', sex:'f', dob:'1978-07-19', dod:null, branch:'Bungoma', county:'Bungoma', country:'Kenya', status:'self-employed',
      statusDetail:'Shopkeeper, Bungoma town',
      bio:'Married Daniel in 2004. Runs a hardware shop near the bus stage.',
      edu:[], work:[{org:'Baraza Hardware', role:'Owner', from:'2007', to:null, current:true}] },
    { id:'p09', name:'Peter Otieno', pref:'Peter', sex:'m', dob:'1966-10-02', dod:null, branch:'Nairobi', county:'Nairobi', country:'Kenya', status:'employed',
      statusDetail:'Bank officer, Nairobi',
      bio:'Married Mercy in 1991. Quiet, punctual, and the one who remembers which year everyone graduated.',
      edu:[], work:[{org:'Kenya Commercial Bank', role:'Credit officer', from:'1990', to:null, current:true}] },
    { id:'p10', name:'Zainabu Baraza', pref:'Zainabu', sex:'f', dob:'1976-01-27', dod:null, branch:'Mombasa', county:'Mombasa', country:'Kenya', status:'self-employed',
      statusDetail:'Poultry farm, Mombasa',
      bio:'Runs a poultry farm behind the house in Nyali. Supplies half the weddings in the ward.',
      edu:[], work:[{org:'Zainabu Poultry', role:'Owner', from:'2006', to:null, current:true}] },
    { id:'p11', name:'Brian Baraza', pref:'Brian', sex:'m', dob:'1990-05-14', dod:null, branch:'Bungoma', county:'Bungoma', country:'Kenya', status:'employed',
      statusDetail:'Civil engineer, Eldoret',
      bio:'Works on road contracts in the western counties. The first in the family to take up engineering.',
      edu:[{org:'Jomo Kenyatta University of Agriculture and Technology', role:'BSc, Civil Engineering', from:'2009', to:'2013', current:false}],
      work:[{org:'Western Roads Ltd', role:'Site engineer', from:'2015', to:null, current:true}] },
    { id:'p12', name:'Carol Baraza', pref:'Carol', sex:'f', dob:'1993-11-08', dod:null, branch:'Bungoma', county:'Bungoma', country:'Kenya', status:'employed',
      statusDetail:'Teacher, Bungoma',
      bio:'Teaches at a primary school in Bungoma, in the same stream her mother once taught. Runs the family WhatsApp group whether or not anyone asked.',
      edu:[{org:'Masinde Muliro University', role:'Bachelor of Education', from:'2012', to:'2016', current:false}],
      work:[{org:'Milimani Primary School', role:'Teacher', from:'2017', to:null, current:true}] },
    { id:'p13', name:'Kevin Baraza', pref:'Kevin', sex:'m', dob:'1998-03-30', dod:null, branch:'Bungoma', county:'Bungoma', country:'Kenya', status:'student',
      statusDetail:'Student, Masinde Muliro University',
      bio:'Studies electrical engineering. Repairs the shop’s generator without being asked twice.',
      edu:[{org:'Masinde Muliro University', role:'BEng, Electrical Engineering', from:'2018', to:null, current:true}],
      work:[] },
    { id:'p14', name:'Sharon Otieno', pref:'Sharon', sex:'f', dob:'1992-04-21', dod:null, branch:'Nairobi', county:'Nairobi', country:'Kenya', status:'employed',
      statusDetail:'Software tester, Nairobi',
      bio:'Tests banking software in Nairobi. The family’s unofficial IT desk, willing or not.',
      edu:[{org:'Strathmore University', role:'BSc, Information Technology', from:'2011', to:'2015', current:false}],
      work:[{org:'Nikola Finance', role:'QA engineer', from:'2018', to:null, current:true}] },
    { id:'p15', name:'Mark Otieno', pref:'Mark', sex:'m', dob:'1996-08-16', dod:null, branch:'Nairobi', county:'Nairobi', country:'Kenya', status:'student',
      statusDetail:'Student, University of Nairobi',
      bio:'Studies economics. Argues about the family budget at every gathering.',
      edu:[{org:'University of Nairobi', role:'BA, Economics', from:'2016', to:null, current:true}],
      work:[] },
    { id:'p16', name:'Aisha Baraza', pref:'Aisha', sex:'f', dob:'2009-02-09', dod:null, branch:'Mombasa', county:'Mombasa', country:'Kenya', status:'student',
      statusDetail:'Form 2, Mombasa High School', bio:'', edu:[], work:[] },
    { id:'p17', name:'Samir Baraza', pref:'Samir', sex:'m', dob:'2012-06-25', dod:null, branch:'Mombasa', county:'Mombasa', country:'Kenya', status:'student',
      statusDetail:'Class 7, Mombasa Primary', bio:'', edu:[], work:[] },
    { id:'p18', name:'Joy Baraza', pref:'Joy', sex:'f', dob:'2010-10-12', dod:null, branch:'Bungoma', county:'Bungoma', country:'Kenya', status:'student',
      statusDetail:'Form 1, Bungoma Girls',
      bio:'Joined the family in 2014, when Naomi brought her home.', edu:[], work:[] },
    { id:'p19', name:'Moses Baraza', pref:'Mzee Moses', sex:'m', dob:'1946-01-15', dod:null, branch:'Bungoma', county:'Bungoma', country:'Kenya', status:'retired',
      statusDetail:'Retired mechanic',
      bio:'Silas’s younger brother. Ran a garage on the Malaba road for thirty years.',
      edu:[], work:[{org:'Moses Motors', role:'Mechanic', from:'1968', to:'2001', current:false}] },
    { id:'p20', name:'Rose Baraza', pref:'Rose', sex:'f', dob:'1970-05-06', dod:null, branch:'Bungoma', county:'Bungoma', country:'Kenya', status:'employed',
      statusDetail:'Hotel receptionist, Bungoma',
      bio:'Moses’s eldest daughter. Works the front desk at a hotel in town.',
      edu:[], work:[{org:'Bungoma Hotel', role:'Front desk', from:'1995', to:null, current:true}] },
    { id:'p21', name:'Isaac Baraza', pref:'Isaac', sex:'m', dob:'1973-09-14', dod:null, branch:'Bungoma', county:'Kakamega', country:'Kenya', status:'self-employed',
      statusDetail:'Mason and contractor, Kakamega',
      bio:'Moses’s son. Builds houses across the western counties and employs half the cousins in December.',
      edu:[], work:[{org:'Isaac Building Works', role:'Contractor', from:'2000', to:null, current:true}] }
  ];

  var relationships = [];
  function rel(a, b, type, subtype, start, end) {
    relationships.push({ id: 'r' + (relationships.length + 1), a: 'p' + a, b: 'p' + b, type: type, subtype: subtype || null, start: start || null, end: end || null });
  }

  ['03','04','05','06'].forEach(function (c) { rel('01', c, 'parent', 'biological'); rel('02', c, 'parent', 'biological'); });
  rel('01','02','partner', null, '1963');
  rel('03','07','partner', null, '1988');
  rel('03','08','partner', null, '2004');
  rel('04','09','partner', null, '1991');
  rel('05','10','partner', null, '2000');
  rel('03','11','parent','biological'); rel('07','11','parent','biological');
  rel('03','12','parent','biological'); rel('07','12','parent','biological');
  rel('03','13','parent','biological'); rel('08','13','parent','biological');
  rel('04','14','parent','biological'); rel('09','14','parent','biological');
  rel('04','15','parent','biological'); rel('09','15','parent','biological');
  rel('05','16','parent','biological'); rel('10','16','parent','biological');
  rel('05','17','parent','biological'); rel('10','17','parent','biological');
  rel('06','18','parent','adopted');
  rel('19','20','parent','biological');
  rel('19','21','parent','biological');

  var siblingHints = [ { a:'p01', b:'p19' } ];

  var FIELDS = ['dob', 'contact', 'status', 'location', 'education', 'work'];
  var FIELD_LABEL = { dob: 'Date of birth', contact: 'Contact details', status: 'Status', location: 'Location', education: 'Education', work: 'Work' };
  var LEVEL_LABEL = { owner: 'Owner only', branch: 'Branch', members: 'Members', public: 'Public' };
  var LEVEL_ORDER = ['owner', 'branch', 'members', 'public'];

  var familyDefaults = { dob:'members', contact:'owner', status:'members', location:'members', education:'members', work:'members' };

  var visibility = {};
  people.forEach(function (p) { visibility[p.id] = Object.assign({}, familyDefaults); });
  ['p16','p17','p18'].forEach(function (id) {
    visibility[id].dob = 'owner';
    visibility[id].contact = 'owner';
    visibility[id].location = 'owner';
  });

  var consents = [
    { id:'c1', personId:'p18', givenBy:'p06', scope:'Photo and school', givenAt:'2024-10-12', withdrawnAt:null }
  ];

  var contacts = { p03: { phone: '+254 7•• ••• 442', email: 'd.baraza@example.com' } };

  var requests = [
    { id:'r1', personId:'p16', authorId:'p05', field:'statusDetail', fieldLabel:'School',
      before:'Form 2, Mombasa High School', after:'Form 3, Mombasa High School',
      reason:'She moved up to Form 3 in January.', status:'pending', createdAt:'2026-11-11T08:20:00+03:00' },
    { id:'r2', personId:'p10', authorId:'p05', field:'statusDetail', fieldLabel:'Work',
      before:'Poultry farm, Mombasa', after:'Poultry and dairy farm, Mombasa',
      reason:'We added dairy cows in March and the farm now has two lines.', status:'pending', createdAt:'2026-11-08T15:05:00+03:00' },
    { id:'r3', personId:'p17', authorId:'p05', field:'statusDetail', fieldLabel:'School',
      before:'Class 7, Mombasa Primary', after:'Class 8, Mombasa Primary',
      reason:'New class year.', status:'pending', createdAt:'2026-11-12T21:40:00+03:00' }
  ];

  var corrections = [
    { id:'x1', personId:'p20', authorId:'p20', text:'Please correct my phone number and remove my date of birth from the directory.',
      status:'open', createdAt:'2026-11-10T11:00:00+03:00' }
  ];

  var invites = [
    { id:'i1', email:'isaac.baraza@example.com', role:'Viewer', branch:null, sentAt:'2026-11-11T10:00:00+03:00', expiresAt:'2026-11-18T10:00:00+03:00', status:'pending' },
    { id:'i2', email:'grace.wekesa@example.com', role:'Editor', branch:'Bungoma', sentAt:'2026-11-07T09:00:00+03:00', expiresAt:'2026-11-14T09:00:00+03:00', status:'pending' }
  ];

  var activity = [
    { id:'a1', actorId:'p03', text:'approved a change to Carol Baraza’s work record', at:'2026-11-13T07:10:00+03:00' },
    { id:'a2', actorId:'p05', text:'suggested a change to Aisha Baraza’s school', at:'2026-11-11T08:20:00+03:00' },
    { id:'a3', actorId:'p03', text:'invited isaac.baraza@example.com as a viewer', at:'2026-11-11T10:00:00+03:00' },
    { id:'a4', actorId:'p07', text:'viewed Brian Baraza’s profile', at:'2026-11-10T19:45:00+03:00' },
    { id:'a5', actorId:'p03', text:'hid Samir Baraza’s contact details', at:'2026-11-08T12:30:00+03:00' },
    { id:'a6', actorId:'p03', text:'exported the family data as JSON', at:'2026-11-06T16:00:00+03:00' }
  ];

  var members = ['p01','p02','p03','p04','p05','p06','p07','p08','p09','p10','p11','p12','p13','p14','p15','p19','p20','p21'];

  var roles = {
    p03: { role:'Owner', branch:null },
    p05: { role:'Editor', branch:'Mombasa' },
    p07: { role:'Viewer', branch:null },
    p11: { role:'Viewer', branch:null }
  };

  var index = {};
  people.forEach(function (p) { index[p.id] = p; });

  function byId(id) { return index[id] || null; }
  function fullName(id) { var p = byId(id); return p ? p.name : 'Unknown'; }
  function first(id) { var p = byId(id); return p ? p.name.split(' ')[0] : 'Unknown'; }
  function initials(id) {
    var p = byId(id); if (!p) return '?';
    var parts = p.name.split(' ');
    return (parts[0][0] + (parts[1] ? parts[1][0] : '')).toUpperCase();
  }
  function branchClass(b) { return b === 'Nairobi' ? 'b2' : b === 'Mombasa' ? 'b3' : 'b1'; }

  function age(p) {
    if (!p || !p.dob) return null;
    var end = p.dod ? d(p.dod) : TODAY;
    var b = d(p.dob);
    var a = end.getFullYear() - b.getFullYear();
    var m = end.getMonth() - b.getMonth();
    if (m < 0 || (m === 0 && end.getDate() < b.getDate())) a--;
    return a;
  }
  function isMinor(p) { return !p.dod && age(p) < 18; }
  function year(s) { return s ? s.slice(0, 4) : ''; }
  function shortDate(s) {
    var dt = d(s);
    if (!dt) return '';
    return dt.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Nairobi' });
  }

  function partnersOf(id) {
    return relationships.filter(function (r) {
      return r.type === 'partner' && (r.a === id || r.b === id);
    }).map(function (r) {
      return { id: r.a === id ? r.b : r.a, start: r.start, end: r.end, rel: r };
    }).sort(function (x, y) { return (x.start || '') < (y.start || '') ? -1 : 1; });
  }
  function parentsOf(id) {
    return relationships.filter(function (r) { return r.type === 'parent' && r.b === id; })
      .map(function (r) { return { id: r.a, subtype: r.subtype, rel: r }; });
  }
  function childrenOf(id) {
    return relationships.filter(function (r) { return r.type === 'parent' && r.a === id; })
      .map(function (r) { return { id: r.b, subtype: r.subtype, rel: r }; });
  }
  function siblingsOf(id) {
    var parentIds = parentsOf(id).map(function (x) { return x.id; });
    var out = [];
    people.forEach(function (p) {
      if (p.id === id) return;
      var sharedParents = parentsOf(p.id).filter(function (x) { return parentIds.indexOf(x.id) !== -1; });
      if (sharedParents.length) {
        out.push({ id: p.id, shared: sharedParents.length, full: sharedParents.length === parentIds.length && parentIds.length > 0 });
      }
    });
    return out.sort(function (x, y) { return (byId(x.id).dob || '') < (byId(y.id).dob || '') ? -1 : 1; });
  }

  function relationLabel(fromId, toId) {
    if (fromId === toId) return 'you';
    var to = byId(toId); if (!to) return '';
    var g = to.sex === 'f' ? 'f' : 'm';

    if (partnersOf(fromId).some(function (x) { return x.id === toId; })) return g === 'f' ? 'your wife' : 'your husband';
    if (parentsOf(fromId).some(function (x) { return x.id === toId; })) {
      var pr = parentsOf(fromId).find(function (x) { return x.id === toId; });
      if (pr.subtype === 'adopted') return g === 'f' ? 'your adoptive mother' : 'your adoptive father';
      return g === 'f' ? 'your mother' : 'your father';
    }
    if (childrenOf(fromId).some(function (x) { return x.id === toId; })) {
      var cr = childrenOf(fromId).find(function (x) { return x.id === toId; });
      if (cr.subtype === 'adopted') return g === 'f' ? 'your adopted daughter' : 'your adopted son';
      return g === 'f' ? 'your daughter' : 'your son';
    }

    var sib = siblingsOf(fromId).find(function (x) { return x.id === toId; });
    if (sib) return sib.full ? (g === 'f' ? 'your sister' : 'your brother') : (g === 'f' ? 'your half-sister' : 'your half-brother');

    var gp = parentsOf(fromId).some(function (p1) { return parentsOf(p1.id).some(function (p2) { return p2.id === toId; }); });
    if (gp) return g === 'f' ? 'your grandmother' : 'your grandfather';
    var gc = childrenOf(fromId).some(function (c1) { return childrenOf(c1.id).some(function (c2) { return c2.id === toId; }); });
    if (gc) return g === 'f' ? 'your granddaughter' : 'your grandson';

    var aunt = parentsOf(fromId).some(function (p1) {
      return siblingsOf(p1.id).some(function (s) { return s.id === toId; });
    });
    if (aunt) return g === 'f' ? 'your aunt' : 'your uncle';

    var cousin = parentsOf(fromId).some(function (p1) {
      return siblingsOf(p1.id).some(function (s) {
        return childrenOf(s.id).some(function (c) { return c.id === toId; });
      });
    });
    if (cousin) return 'your cousin';

    var inLaw = partnersOf(fromId).some(function (pt) {
      return parentsOf(pt.id).some(function (p1) {
        return siblingsOf(p1.id).some(function (s) { return s.id === toId; }) ||
               (parentsOf(pt.id).some(function (q) { return childrenOf(q.id).some(function (c) { return c.id === toId; }); }));
      });
    });
    if (inLaw) return 'related by marriage';

    return '';
  }

  function visibilityOf(personId, field) {
    return (visibility[personId] && visibility[personId][field]) || familyDefaults[field] || 'members';
  }

  function consentFor(personId) {
    return consents.find(function (c) { return c.personId === personId && !c.withdrawnAt; }) || null;
  }

  function reach(level) {
    if (level === 'public') return 0;
    if (level === 'owner') return 1;
    if (level === 'branch') return 6;
    return members.length;
  }

  function relTime(iso) {
    var t = new Date(iso).getTime();
    var diff = TODAY.getTime() - t;
    var mins = Math.round(diff / 60000);
    if (mins < 60) return mins <= 1 ? 'just now' : mins + ' minutes ago';
    var hrs = Math.round(mins / 60);
    if (hrs < 24) return hrs === 1 ? 'an hour ago' : hrs + ' hours ago';
    var days = Math.round(hrs / 24);
    if (days === 1) return 'yesterday';
    if (days < 7) return days + ' days ago';
    var weeks = Math.round(days / 7);
    return weeks === 1 ? 'a week ago' : weeks + ' weeks ago';
  }

  window.FH = window.FH || {};
  window.FH.data = {
    TODAY: TODAY,
    FIELDS: FIELDS,
    FIELD_LABEL: FIELD_LABEL,
    LEVEL_LABEL: LEVEL_LABEL,
    LEVEL_ORDER: LEVEL_ORDER,
    people: people,
    relationships: relationships,
    siblingHints: siblingHints,
    requests: requests,
    corrections: corrections,
    invites: invites,
    activity: activity,
    members: members,
    roles: roles,
    visibility: visibility,
    familyDefaults: familyDefaults,
    consents: consents,
    contacts: contacts,
    OWNER_ID: 'p03',
    byId: byId, fullName: fullName, first: first, initials: initials, branchClass: branchClass,
    age: age, isMinor: isMinor, year: year, shortDate: shortDate,
    partnersOf: partnersOf, parentsOf: parentsOf, childrenOf: childrenOf,
    siblingsOf: siblingsOf, relationLabel: relationLabel,
    visibilityOf: visibilityOf, consentFor: consentFor,
    reach: reach, relTime: relTime
  };
})();
