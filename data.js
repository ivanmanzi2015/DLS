// ============================================================
// DLS LEAGUE — SHARED DATA STORE (data.js)
// Both admin.html and user.html load this file
// In production, replace with Firebase / Supabase
// ============================================================

window.DLS = window.DLS || {};

DLS.teams = [
  { id:1, name:"Kigali Kings",   short:"KK",  color:"#e63946", manager:"Eric M.",   logo:"??", managerId:1 },
  { id:2, name:"Dream FC",       short:"DFC", color:"#2196f3", manager:"David N.",  logo:"?", managerId:2 },
  { id:3, name:"Elite Boys",     short:"EB",  color:"#00e676", manager:"Paul B.",   logo:"??", managerId:3 },
  { id:4, name:"Galaxy FC",      short:"GFC", color:"#9c27b0", manager:"Sam R.",    logo:"??", managerId:4 },
];

DLS.players = [
  { id:1,  teamId:1, name:"Mugisha Eric",      goals:5, assists:3, cleanSheets:2 },
  { id:2,  teamId:1, name:"Habimana Jean",     goals:3, assists:2, cleanSheets:2 },
  { id:3,  teamId:2, name:"Nkurunziza David",  goals:4, assists:1, cleanSheets:1 },
  { id:4,  teamId:2, name:"Uwimana Kevin",     goals:2, assists:4, cleanSheets:1 },
  { id:5,  teamId:3, name:"Bizimana Paul",     goals:6, assists:0, cleanSheets:0 },
  { id:6,  teamId:3, name:"Nsengimana Felix",  goals:1, assists:3, cleanSheets:0 },
  { id:7,  teamId:4, name:"Rwabuhungu Sam",    goals:3, assists:2, cleanSheets:1 },
  { id:8,  teamId:4, name:"Ndayishimiye Tom",  goals:2, assists:1, cleanSheets:1 },
];

DLS.fixtures = [
  { id:1, homeId:1, awayId:2, time:"7:00 PM", date:"Today",    status:"FT",   homeGoals:2, awayGoals:1, highlighted:true,
    events:[{min:23,teamId:1,player:"Mugisha Eric",type:"goal"},{min:55,teamId:1,player:"Habimana Jean",type:"goal"},{min:67,teamId:2,player:"Nkurunziza David",type:"goal"}],
    chat:[ {user:"Eric M.",msg:"LET'S GOOO ??",time:"7:05 PM"}, {user:"David N.",msg:"Game on! ?",time:"7:06 PM"}, {user:"Paul B.",msg:"Watching this one ??",time:"7:10 PM"} ]
  },
  { id:2, homeId:3, awayId:4, time:"8:00 PM", date:"Today",    status:"FT",   homeGoals:1, awayGoals:3, highlighted:false,
    events:[{min:10,teamId:4,player:"Rwabuhungu Sam",type:"goal"},{min:30,teamId:3,player:"Nsengimana Felix",type:"goal"},{min:71,teamId:4,player:"Rwabuhungu Sam",type:"goal"},{min:89,teamId:4,player:"Ndayishimiye Tom",type:"goal"}],
    chat:[]
  },
  { id:3, homeId:1, awayId:3, time:"7:00 PM", date:"Tomorrow", status:"NS",   homeGoals:0, awayGoals:0, highlighted:false, events:[], chat:[] },
  { id:4, homeId:2, awayId:4, time:"8:00 PM", date:"Tomorrow", status:"NS",   homeGoals:0, awayGoals:0, highlighted:false, events:[], chat:[] },
  { id:5, homeId:4, awayId:1, time:"7:30 PM", date:"Fri 30",   status:"NS",   homeGoals:0, awayGoals:0, highlighted:false, events:[], chat:[] },
  { id:6, homeId:2, awayId:3, time:"8:30 PM", date:"Fri 30",   status:"NS",   homeGoals:0, awayGoals:0, highlighted:false, events:[], chat:[] },
];

DLS.users = [
  { id:1, username:"eric_kk",   password:"pass1", name:"Eric Mugisha",   teamId:1, role:"player", avatar:"??", banned:false },
  { id:2, username:"david_dfc", password:"pass2", name:"David Nkurunziza",teamId:2, role:"player", avatar:"?", banned:false },
  { id:3, username:"paul_eb",   password:"pass3", name:"Paul Bizimana",  teamId:3, role:"player", avatar:"??", banned:false },
  { id:4, username:"sam_gfc",   password:"pass4", name:"Sam Rwabuhungu", teamId:4, role:"player", avatar:"??", banned:false },
];

DLS.scoreReports = [
  { id:1, fixtureId:3, submittedBy:1, homeGoals:2, awayGoals:0, status:"pending", time:"Just now", note:"Won clean 2-0" },
];

DLS.notifications = [
  { id:1, userId:1, msg:"Your match vs Elite Boys is Tomorrow at 7:00 PM", read:false, time:"1h ago", type:"match" },
  { id:2, userId:1, msg:"Kigali Kings climbed to #1 in the table! ??", read:false, time:"2h ago", type:"table" },
  { id:3, userId:2, msg:"Match result submitted. Awaiting admin approval.", read:true, time:"3h ago", type:"report" },
];

DLS.matchOfWeek = 1; // fixture id

DLS.settings = {
  leagueName: "DLS Mini League",
  season: "Season 1",
  city: "Kigali, Rwanda",
  adminPassword: "admin123"
};

// Helpers
DLS.teamById  = id => DLS.teams.find(t => t.id === id) || {};
DLS.fixtureById = id => DLS.fixtures.find(f => f.id === id);
DLS.userById  = id => DLS.users.find(u => u.id === id) || {};

DLS.computeTable = function() {
  const map = {};
  DLS.teams.forEach(t => map[t.id] = { id:t.id, P:0,W:0,D:0,L:0,GF:0,GA:0,Pts:0,form:[] });
  DLS.fixtures.filter(f=>f.status==="FT").forEach(f=>{
    const h=map[f.homeId], a=map[f.awayId]; if(!h||!a) return;
    h.P++;a.P++; h.GF+=f.homeGoals;h.GA+=f.awayGoals;a.GF+=f.awayGoals;a.GA+=f.homeGoals;
    if(f.homeGoals>f.awayGoals){h.W++;h.Pts+=3;a.L++;h.form.push('W');a.form.push('L');}
    else if(f.homeGoals<f.awayGoals){a.W++;a.Pts+=3;h.L++;h.form.push('L');a.form.push('W');}
    else{h.D++;a.D++;h.Pts++;a.Pts++;h.form.push('D');a.form.push('D');}
  });
  return Object.values(map).sort((a,b)=>b.Pts-a.Pts||(b.GF-b.GA)-(a.GF-a.GA));
};