import{n as e,r as t,t as n}from"./index-DWFevvEk.js";var r=t(e(),1),i={day:{slotHours:24,slotPx:136,label:`Day`},qday:{slotHours:6,slotPx:92,label:`6h`},hour:{slotHours:1,slotPx:52,label:`Hour`}},a=396e5,o=864e5,s=36e5,c=[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],l=[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`];function u(e){let t=new Date(e.getTime()+a);return{year:t.getUTCFullYear(),month:t.getUTCMonth(),day:t.getUTCDate(),hour:t.getUTCHours(),minute:t.getUTCMinutes(),dow:t.getUTCDay()}}function d(e,t,n,r=0,i=0){return new Date(Date.UTC(e,t,n,r,i)-a)}function f(e){let t=u(e);return d(t.year,t.month,t.day)}function p(e){let t=u(e);return`${c[t.dow]} ${t.day} ${l[t.month]}`}function m(e){return String(u(e).hour).padStart(2,`0`)}function h(e){let t=u(e);return`${String(t.hour).padStart(2,`0`)}:${String(t.minute).padStart(2,`0`)}`}function g(e,t){let n=u(e),r=u(new Date(t.getTime()-1));return n.month===r.month&&n.year===r.year?`${n.day}–${r.day} ${l[n.month]} ${n.year}`:`${n.day} ${l[n.month]} – ${r.day} ${l[r.month]} ${r.year}`}function _(e,t){let n=u(e),r=u(t),i=n.year===r.year&&n.month===r.month&&n.day===r.day;return`${`${c[n.dow]} ${n.day} ${l[n.month]}, ${h(e)}`}–${i?h(t):`${c[r.dow]} ${r.day} ${l[r.month]}, ${h(t)}`}`}function v(e,t,n){let r=(e.getTime()-t.getTime())/s,a=i[n];return r/a.slotHours*a.slotPx}function y(e,t=7){return Array.from({length:t},(t,n)=>new Date(e.getTime()+n*o))}function b(e,t,n=7){let r=i[t],a=n*24/r.slotHours,o=r.slotHours*s;return Array.from({length:a},(t,n)=>new Date(e.getTime()+n*o))}function x(e){let t=e.toLowerCase();return/cancelled\s+shift/.test(t)?`cancelled`:/\btechnical director\b|\btech director\b|\btd\b/.test(t)?`director`:/\bwarehouse\b|\bdriver\b|\bloader\b|\bvan\b|\btruck\b/.test(t)?`logistics`:/\bcamera\b|\bcam\b/.test(t)?`camera`:/\bdes\b/.test(t)?`vision`:/\baudio\b|\ba1\b|\ba2\b|\ba3\b|\brf\b|\bsound\b/.test(t)?`audio`:/\bvision\b|\bv1\b|\bv2\b|\bv3\b/.test(t)?`vision`:/\blighting\b|\blx\b|\bld\b/.test(t)?`lighting`:/\bav\b/.test(t)?`av`:`other`}function S(e,t){let n=e.trim();return!n||/^\d/.test(n)||/^unassigned$/i.test(n)?`open`:t===`unconfirmed`?`unconfirmed`:`confirmed`}function C(e){let t=e.map((e,t)=>({...e,index:t})).sort((e,t)=>e.start-t.start||e.end-t.end),n=[],r=Array(e.length).fill(0);for(let e of t){let t=n.findIndex(t=>t<=e.start);t===-1?(t=n.length,n.push(e.end)):n[t]=e.end,r[e.index]=t}return r}function w(e,t){let n=e.getTime();return n>=t.getTime()&&n<t.getTime()+o}var T=864e5,E=18e5;function D(e){let t=[],n=[],r=``,i=!1,a=e.replace(/^\uFEFF/,``);for(let e=0;e<a.length;e++){let o=a[e];i?o===`"`?a[e+1]===`"`?(r+=`"`,e++):i=!1:r+=o:o===`"`?i=!0:o===`,`?(n.push(r),r=``):o===`
`?(n.push(r),t.push(n),n=[],r=``):o!==`\r`&&(r+=o)}return(r.length||n.length)&&(n.push(r),t.push(n)),t.filter(e=>e.some(e=>e.trim()))}function O(e){let t=/^(\d{1,2}):(\d{2})$/.exec(e.trim());if(!t)return null;let n=Number(t[1]),r=Number(t[2]);return n>23||r>59?null:{hour:n,minute:r}}function k(e){return/cancel/i.test(e)?`unconfirmed`:`confirmed`}function A(e,t=`roster.csv`){let n=D(e);if(!n.length)throw Error(`That CSV is empty.`);let r=n[0].map(e=>e.trim().toLowerCase()),i=e=>r.indexOf(e),a={date:i(`date`),start:i(`start time`),end:i(`end time`),employee:i(`employee roster name`),department:i(`department`),event:i(`event`),fn:i(`function`),role:i(`role`)};if(Object.values(a).some(e=>e<0))throw Error(`CSV needs Date, Start Time, End Time, Employee Roster Name, Department, Event, Function and Role.`);let o=(e,t)=>(e[t]??``).trim(),s=[];for(let e of n.slice(1)){let t=/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/.exec(o(e,a.date)),n=O(o(e,a.start)),r=O(o(e,a.end));if(!t||!n||!r)continue;let i=Number(t[3]),c=Number(t[2])-1,l=Number(t[1]),u=d(i,c,l,n.hour,n.minute),f=n.hour*60+n.minute,p=r.hour*60+r.minute,m;m=p<f?d(i,c,l+1,r.hour,r.minute):p===f?new Date(u.getTime()+E):r.hour===23&&r.minute===59?d(i,c,l+1):d(i,c,l,r.hour,r.minute);let h=o(e,a.role)||`—`;s.push({id:`s${s.length}`,employee:o(e,a.employee)||`Unassigned`,fn:o(e,a.fn),role:h,tone:x(h),status:k(h),start:u,end:m,dept:o(e,a.department)||`No department`,event:o(e,a.event)||`No event`})}if(!s.length)throw Error(`No shifts in that CSV.`);let c=s[0].start.getTime(),l=s[0].end.getTime();for(let e of s)c=Math.min(c,e.start.getTime()),l=Math.max(l,e.end.getTime());let u=f(new Date(c)),p=f(new Date(l-1)),m=Math.round((p.getTime()-u.getTime())/T)+1,h=new Map;for(let e of s){let t=h.get(e.dept);t||(t=new Map,h.set(e.dept,t));let n=t.get(e.event)??[];n.push(e),t.set(e.event,n)}return{departments:[...h.entries()].sort(([e],[t])=>e.localeCompare(t)).map(([e,t])=>({id:e,name:e,events:[...t.entries()].map(([t,n])=>({id:`${e}\u0000${t}`,name:t,assignments:n.sort((e,t)=>e.start.getTime()-t.start.getTime())})).sort((e,t)=>e.name===`No event`?1:t.name===`No event`?-1:(e.assignments[0]?.start.getTime()??0)-(t.assignments[0]?.start.getTime()??0)||e.name.localeCompare(t.name))})),origin:u,dayCount:m,shiftCount:s.length,fileName:t}}var j=`Date,Start Time,End Time,Employee Roster Name,Department,Event,Function,Role\r
16/11/2026,17:00,17:30,,VIC-Crowne Plaza Melbourne,,,AV Meet & Greet\r
17/11/2026,17:30,18:00,,VIC-Crown Towers,1017321 - M1 | Carbonhalo AASB S2 Briefing,Pack Down,AV Technician\r
22/11/2026,08:00,08:30,,VIC-Pullman Melbourne Albert Park,1021426 - Element | Federation Uni,Rehearsal,AV Meet & Greet\r
22/11/2026,17:30,18:00,0 DO NOT CREW,VIC-Pullman Melbourne Albert Park,1004868 - LAKE 1-2 | USANZ Trainee Week 2026,Pack Down,AV Technician\r
20/11/2026,14:00,14:30,0 DO NOT CREW,VIC-Pullman Melbourne Albert Park,1006555 - Grand 1-6 | Mac Robertson Girls School Grad,Pack Down,AV Technician\r
18/11/2026,11:00,14:00,0 DO NOT CREW,VIC-Base Event Delivery,1018398 - Kooyong Tennis Club | AV Installs Temp Hire,Load Return,Driver MR\r
20/11/2026,23:00,23:30,0 DO NOT CREW,VIC-Pullman Melbourne Albert Park,1002578 - Grand 1-6 | Aquinas College Dinner 2026,Pack Down,AV Technician\r
21/11/2026,05:00,05:30,0 DO NOT CREW,VIC-Pullman Melbourne Albert Park,1010655 - Lake 1-4 | ANZCA Primary Refresher,Pack Down,AV Technician\r
16/11/2026,18:30,18:30,0CROWN DoNotCre,VIC-Crown Towers,1017067 - M10 | Nufarm NOV Meeting,Set Up,AV Technician\r
16/11/2026,15:30,15:30,0CROWN DoNotCre,VIC-Crown Towers,1019415 - CCH1 | CBN - CD Days,Pack Down,AV Technician\r
16/11/2026,16:30,16:30,0CROWN DoNotCre,VIC-Crown Towers,1020726 - River 1 | CML Committee Meeting,Pack Down,AV Technician\r
18/11/2026,07:00,07:00,0CROWN DoNotCre,VIC-Crown Towers,1005319 - River | ANZ Proprietary Lending - Remote Awards Ni,Pack Down,AV Technician\r
19/11/2026,14:00,14:00,0CROWN DoNotCre,VIC-Crown Towers,1010787 - Additions | Padua College,Set Up,AV Technician\r
22/11/2026,09:00,09:00,0CROWN DoNotCre,VIC-Crown Towers,0971125 - Pall | William Adams 100 Year Celebration - VIC &,Pack Down,AV Technician\r
22/11/2026,12:00,12:00,0CROWN DoNotCre,VIC-Crown Towers,1016512 - PROM | DINNER | Community Collective Event,Pack Down,AV Technician\r
20/11/2026,16:00,16:00,0CROWN DoNotCre,VIC-Crown Towers,1017463 - Horizon | HDI Global EOYC,Pack Down,AV Technician\r
21/11/2026,12:00,12:00,0CROWN DoNotCre,VIC-Crown Towers,0971125 - Pall | William Adams 100 Year Celebration - VIC &,Set Up,AV Technician\r
21/11/2026,13:00,13:00,0CROWN DoNotCre,VIC-Crown Towers,1019936 - BAND | William Adams 100 Year Celebration - VIC &,Set Up,AV Technician\r
17/11/2026,17:00,17:00,0CROWN DoNotCre,VIC-Crown Towers,1015344 - Garden Room 2&3 | Iron Mountain Meeting,Pack Down,AV Technician\r
19/11/2026,15:00,15:00,0CROWN DoNotCre,VIC-Crown Towers,1015961 - CCH 1 | Community Collective Event,Pack Down,AV Technician\r
20/11/2026,11:00,11:00,0CROWN DoNotCre,VIC-Crown Towers,1010290 - Prom 1 - Engie Team Building Day,Pack Down,AV Technician\r
18/11/2026,16:00,16:00,0CROWN DoNotCre,VIC-Crown Towers,0973429 - CCH 1&2 | OT  ICS & SCADA Automation Conference,Pack Down,AV Technician\r
18/11/2026,08:00,08:00,0CROWN DoNotCre,VIC-Crown Towers,1017313 - Evergreen | Australian Corporate Games Awards Part,Pack Down,AV Technician\r
18/11/2026,16:00,16:00,0CROWN DoNotCre,VIC-Crown Towers,1017900 - Horizon | Tim Donohue Client Farewell Lunch,Pack Down,AV Technician\r
19/11/2026,23:30,23:30,0CROWN DoNotCre,VIC-Crown Towers,0992438 - Pal | Frankson High Valedictory 2026 Additions,Pack Down,AV Technician\r
19/11/2026,15:00,15:00,0CROWN DoNotCre,VIC-Crown Towers,0998372 - Promenade 1 & 2 | Finsure & Loankit PD Day '26,Pack Down,AV Technician\r
18/11/2026,20:30,20:30,0CROWN DoNotCre,VIC-Crown Towers,1000746 - Pall AB | CPA Australia Member Recognition Ceremon,Pack Down,AV Technician\r
18/11/2026,08:00,08:00,0CROWN DoNotCre,VIC-Crown Towers,1015359 - Pall C | CPA Australia Member Recognition Ceremoni,Pack Down,AV Technician\r
18/11/2026,08:00,08:00,0CROWN DoNotCre,VIC-Crown Towers,1020059 - River 1 | AICC Boardroom - November 2026,Pack Down,AV Technician\r
19/11/2026,08:00,08:00,0CROWN DoNotCre,VIC-Crown Towers,1020235 - Garden | GACM International Forum 2026,Pack Down,AV Technician\r
20/11/2026,07:00,07:00,0CROWN DoNotCre,VIC-Crown Towers,0966858 - Pal | Padua College Year 12 Valedictory Di,Pack Down,AV Technician\r
16/11/2026,07:00,09:00,0 VEHICLE TO FI,VIC-Events Flemington,1012994 - MP Staff Charity Ball | Atrium,Load Return,Van\r
17/11/2026,12:00,15:00,0 VEHICLE TO FI,VIC-Base Event Delivery,1001469 - Ritz Carlton Melb | ANZ Lending Conference,Load Deliver,Van\r
18/11/2026,17:00,19:00,0 VEHICLE TO FI,VIC-Base Event Delivery,1001469 - Ritz Carlton Melb | ANZ Lending Conference,Load Return,Van\r
19/11/2026,17:00,19:00,0 VEHICLE TO FI,VIC-Hilton Melb Little Queen St,,,Van\r
17/11/2026,11:30,12:00,0 VEHICLE TO FI,VIC-Base Event Delivery,1021672 - KLTC | Stadium | Lapel Mics 16 Nov 26,Load Return,Van\r
19/11/2026,06:00,09:00,0 VEHICLE TO FI,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),Start at Base,Truck\r
20/11/2026,06:00,09:00,0 VEHICLE TO FI,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),,Truck\r
20/11/2026,07:00,09:00,0 VEHICLE TO FI,VIC-Events Flemington,1012994 - MP Staff Charity Ball | Atrium,Load Deliver,Van\r
18/11/2026,11:00,14:00,0 VEHICLE TO FI,VIC-Base Event Delivery,1018398 - Kooyong Tennis Club | AV Installs Temp Hire,Load Return,Truck\r
16/11/2026,06:00,09:00,0 VENUE DoNotCr,VIC-Events Flemington,1012994 - MP Staff Charity Ball | Atrium,Pack Down,AV Technician\r
16/11/2026,06:00,09:00,0 VENUE DoNotCr,VIC-Events Flemington,1012994 - MP Staff Charity Ball | Atrium,Pack Down,AV Technician\r
18/11/2026,17:00,17:15,0 VENUE DoNotCr,VIC-Pan Pacific Melbourne,1021172 - RDD | Amex Breakout Room 18/11,,AV Technician\r
18/11/2026,07:00,07:30,0 VENUE DoNotCr,VIC-Melbourne Marriott Hotel,1002824 - Yarra Suites | Getinge,Pack Down,AV Technician\r
18/11/2026,08:15,08:45,0 VENUE DoNotCr,VIC-Melbourne Marriott Hotel,1005651 - EXHIBITION | GETINGE,Pack Down,AV Technician\r
19/11/2026,08:30,09:00,0 VENUE DoNotCr,VIC-The Langham Melbourne,1007952 - Yarra | Patrick Terminals,Rehearsal,AV Meet & Greet\r
19/11/2026,23:59,23:59,0 VENUE DoNotCr,VIC-1 Hotel Melbourne,1008804 - Seafarers | LFRA Forum,Pack Down,AV Technician\r
18/11/2026,22:00,22:30,0 VENUE DoNotCr,VIC-Melbourne Marriott Hotel,1009168 - Exhibition | Skin Health Institute All Staff Forum,Pack Down,AV Technician\r
18/11/2026,22:00,01:00,0 VENUE DoNotCr,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Pack Down,EWP OP\r
18/11/2026,22:00,01:00,0 VENUE DoNotCr,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Pack Down,AV L1\r
18/11/2026,22:00,01:00,0 VENUE DoNotCr,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Pack Down,AV L2\r
18/11/2026,22:00,01:00,0 VENUE DoNotCr,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Pack Down,Crewleader\r
18/11/2026,15:00,15:30,0 VENUE DoNotCr,VIC-Melb Marriott Hotel Docklands,,,Transfer\r
19/11/2026,23:59,23:59,0 VENUE DoNotCr,VIC-1 Hotel Melbourne,1013924 - Seafarers Set | Deakin Chancellor's Dinner,Pack Down,AV Technician\r
19/11/2026,06:30,07:00,0 VENUE DoNotCr,VIC-The Langham Melbourne,1020815 - Little Collins | HIMA,Pack Down,AV Technician\r
18/11/2026,07:45,08:00,0 VENUE DoNotCr,VIC-Pan Pacific Melbourne,1021172 - RDD | Amex Breakout Room 18/11,Set Up,AV Technician\r
20/11/2026,11:00,12:00,0 VENUE DoNotCr,VIC-Crowne Plaza Melbourne,1021401 - Exhibition | Kapitol Group | 20.11..26,Set Up,AV Technician\r
20/11/2026,17:00,17:30,0 VENUE DoNotCr,VIC-Crowne Plaza Melbourne,1021401 - Exhibition | Kapitol Group | 20.11..26,Pack Down,AV Technician\r
17/11/2026,14:00,15:00,0 VENUE DoNotCr,VIC-Melb Marriott Hotel Docklands,,,Transfer\r
17/11/2026,12:00,14:00,0 VENUE DoNotCr,VIC-AC Hotel By Marriott Melb SB,,,Transfer\r
18/11/2026,23:59,23:59,0 VENUE DoNotCr,VIC-1 Hotel Melbourne,1017148 - Set | Lighthouse Foundation,Pack Down,AV Technician\r
18/11/2026,23:59,23:59,0 VENUE DoNotCr,VIC-1 Hotel Melbourne,1017301 - Saltbush & Bracken | KPMG,Pack Down,AV Technician\r
19/11/2026,08:30,09:00,0 VENUE DoNotCr,VIC-The Langham Melbourne,1018552 - Towers II | Brightedge Event,Set Up,AV Meet & Greet\r
21/11/2026,08:00,12:00,0 VENUE DoNotCr,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Pack Down,AV Technician\r
21/11/2026,08:00,12:00,0 VENUE DoNotCr,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Pack Down,AV L1\r
21/11/2026,08:00,12:00,0 VENUE DoNotCr,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Pack Down,AV L2\r
21/11/2026,08:00,12:00,0 VENUE DoNotCr,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Pack Down,Crewleader\r
21/11/2026,23:59,23:59,0 VENUE DoNotCr,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Pack Down,AV Technician\r
20/11/2026,10:30,11:00,0 VENUE DoNotCr,VIC-The Langham Melbourne,1014692 - Towers 2 - Renaissance Tours - Day 3,Pack Down,AV Technician\r
17/11/2026,15:30,18:00,0 VENUE DoNotCr,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Pack Down,EWP OP\r
17/11/2026,15:30,18:00,0 VENUE DoNotCr,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Pack Down,EWP OP\r
17/11/2026,15:30,18:00,0 VENUE DoNotCr,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Pack Down,AV L2\r
17/11/2026,15:30,18:00,0 VENUE DoNotCr,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Pack Down,Crewleader\r
17/11/2026,15:30,18:00,0 VENUE DoNotCr,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Pack Down,AV Technician\r
17/11/2026,15:30,18:00,0 VENUE DoNotCr,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Pack Down,AV Technician\r
18/11/2026,11:00,15:00,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Set Up,AV Technician\r
18/11/2026,11:00,15:00,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Operate,Vision L2\r
18/11/2026,11:00,15:00,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Operate,Audio FOH\r
18/11/2026,11:00,15:00,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Operate,Lighting L2\r
18/11/2026,23:30,03:30,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Pack Down,AV Technician\r
18/11/2026,23:30,03:30,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Pack Down,AV Technician\r
18/11/2026,23:30,03:30,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Pack Down,AV Technician\r
18/11/2026,23:30,03:30,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Pack Down,Crewleader\r
19/11/2026,23:00,03:00,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Pack Down,AV Technician\r
19/11/2026,23:00,03:00,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Pack Down,AV Technician\r
19/11/2026,23:00,03:00,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Pack Down,AV Technician\r
19/11/2026,23:00,03:00,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Pack Down,Crewleader\r
19/11/2026,13:00,15:30,0 VENUE DoNotCr,VIC-Melbourne Showgrounds,1000110 - Point Cook SS College Valedictory Dinner 2026 | VI,Turnaround,AV Technician\r
21/11/2026,23:59,23:59,0 VENUE DoNotCr,VIC-1 Hotel Melbourne,1003305 - Band Rider EMPIRE,Pack Down,AV Technician\r
20/11/2026,10:00,11:00,0 VENUE DoNotCr,VIC-The Langham Melbourne,1016658 - Alto - Sealogic,Set Up,AV Technician\r
20/11/2026,21:30,21:30,0 VENUE DoNotCr,VIC-Crown Towers,1017952 - RIVER 2&3 | Switch Property Meeting,Pack Down,AV Technician\r
17/11/2026,09:30,10:00,3 BACK to BLACK,VIC-The Langham Melbourne,1007952 - Yarra | Patrick Terminals,Rehearsal,AV Meet & Greet\r
18/11/2026,08:30,09:00,3 BACK to BLACK,VIC-The Langham Melbourne,1020815 - Little Collins | HIMA,,AV Meet & Greet\r
19/11/2026,14:30,15:00,3 BACK to BLACK,VIC-The Langham Melbourne,1007952 - Yarra | Patrick Terminals,Pack Down,AV Technician\r
17/11/2026,08:30,09:00,3 BACK to BLACK,VIC-The Langham Melbourne,1020815 - Little Collins | HIMA,Set Up,AV Meet & Greet\r
19/11/2026,10:00,10:30,3 BACK to BLACK,VIC-The Langham Melbourne,1021411 - Swanston | First 60 Orientation,Rehearsal,AV Technician\r
19/11/2026,08:00,08:30,3 BACK to BLACK,VIC-The Langham Melbourne,1022406 - Flinders - Stage & Screen - Cricket Aus,Rehearsal,AV Meet & Greet\r
20/11/2026,09:00,09:30,3 BACK to BLACK,VIC-The Langham Melbourne,1014692 - Towers 2 - Renaissance Tours - Day 3,Rehearsal,AV Meet & Greet\r
18/11/2026,11:30,16:30,AJ Gifford,VIC-Crown Towers,1011049 - 28 | NAB Dinner,Set Up,Lighting L2\r
18/11/2026,08:30,11:30,AJ Gifford,VIC-Crown Towers,0992438 - Pal | Frankson High Valedictory 2026 Additions,Set Up,Lighting L2\r
16/11/2026,09:30,12:30,Aaron Mason,VIC-Crown Towers,1008256 - Horzion | Jioseva Vatuniveivuke & Linda Nguyen's W,Pack Down,AV Technician\r
16/11/2026,08:30,09:30,Aaron Mason,VIC-Crown Towers,1020746 - Aviary | Barry Plant Christmas Party,Pack Down,AV Technician\r
16/11/2026,12:30,16:30,Aaron Mason,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Technician On Duty\r
17/11/2026,10:00,13:30,Aaron Mason,VIC-Crown Towers,1000746 - Pall AB | CPA Australia Member Recognition Ceremon,Set Up,Audio L2\r
17/11/2026,14:00,20:30,Aaron Mason,VIC-Crown Towers,1000746 - Pall AB | CPA Australia Member Recognition Ceremon,Operate,Audio L2\r
19/11/2026,00:30,23:59,Aaron Mason,VIC-Crown Towers,,,RDO\r
17/11/2026,21:00,22:00,Aaron Mason,VIC-Hyde Melbourne Place,1021979 - Emerald | HYDE Melbourne Place,Pack Down,AV Technician\r
18/11/2026,11:30,16:30,Aaron Mason,VIC-Crown Towers,1011049 - 28 | NAB Dinner,Set Up,Audio L1\r
18/11/2026,16:30,23:00,Aaron Mason,VIC-Crown Towers,1011049 - 28 | NAB Dinner,Operate,AV L2\r
20/11/2026,00:00,10:30,Aaron Mason,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,Crewleader\r
17/11/2026,13:30,14:00,Aaron Mason,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Technician On Duty\r
22/11/2026,09:30,18:00,Aaron Mason,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Technical Director Venues\r
21/11/2026,00:30,23:59,Aaron Mason,VIC-Crown Towers,,,RDO\r
22/11/2026,16:30,00:30,Adam Harrison,VIC-Melbourne Showgrounds,1021770 - Indian High Tea and Dinner | VIC PAV,Operate,AV L2\r
20/11/2026,12:00,00:30,LiveVision,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Operate,Camera Director\r
20/11/2026,12:00,00:30,LiveVision,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Operate,Camera Operator\r
20/11/2026,12:00,00:30,LiveVision,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Operate,Camera Operator\r
20/11/2026,12:00,00:30,LiveVision,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Operate,Camera Operator\r
20/11/2026,06:00,09:00,Aleksandar V,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),,Loader\r
19/11/2026,17:00,18:00,Aleksandar V,VIC-Hilton Melb Little Queen St,,,Transfer\r
19/11/2026,15:00,15:30,Aleksandar V,VIC-Melb Marriott Hotel Docklands,,,Transfer\r
19/11/2026,05:00,08:00,Andres FP,VIC-1 Hotel Melbourne,1008804 - Seafarers | LFRA Forum,Set Up,AV L2\r
20/11/2026,10:00,12:00,Andres FP,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Set Up,Audio L1\r
20/11/2026,12:00,16:00,Andres FP,VIC-Melbourne Cricket Ground,1019305 - Celebration of Life for Ian Edney | MDR,Operate,VX Record Op\r
20/11/2026,08:00,09:00,Andres FP,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Pack Down,Audio L1\r
20/11/2026,09:00,09:30,Andres FP,VIC-Melbourne Cricket Ground,1020083 - MCC LRWFS Committee Lunch | Jameson Suite,Set Up,AV L1\r
20/11/2026,09:30,10:00,Andres FP,VIC-Melbourne Cricket Ground,1020083 - MCC LRWFS Committee Lunch | Jameson Suite,Rehearsal,AV Meet & Greet\r
16/11/2026,10:30,17:30,Andres FP,VIC-Pan Pacific Melbourne,1020156 - Woodside 3-4 | AMEX,Operate,AV L2\r
17/11/2026,07:30,17:30,Andres FP,VIC-Pan Pacific Melbourne,1020156 - Woodside 3-4 | AMEX,,AV L2\r
18/11/2026,07:30,13:00,Andres FP,VIC-Pan Pacific Melbourne,1020156 - Woodside 3-4 | AMEX,,AV L2\r
21/11/2026,00:00,23:59,Andres FP,VIC-Pan Pacific Melbourne,,,RDO\r
22/11/2026,00:00,23:59,Andres FP,VIC-Pan Pacific Melbourne,,,RDO\r
18/11/2026,08:00,08:30,Andrew P,VIC-Pan Pacific Melbourne,1021172 - RDD | Amex Breakout Room 18/11,Rehearsal,AV Meet & Greet\r
17/11/2026,15:00,15:30,Andrew P,VIC-Pan Pacific Melbourne,1021966 - Woodside 2 | Leadership Victoria,Set Up,AV Technician\r
18/11/2026,08:30,09:00,Andrew P,VIC-Pan Pacific Melbourne,1021966 - Woodside 2 | Leadership Victoria,Rehearsal,AV Meet & Greet\r
19/11/2026,08:30,09:00,Andrew P,VIC-Pan Pacific Melbourne,1021966 - Woodside 2 | Leadership Victoria,,AV Meet & Greet\r
20/11/2026,08:30,09:00,Andrew P,VIC-Pan Pacific Melbourne,1021966 - Woodside 2 | Leadership Victoria,,AV Meet & Greet\r
21/11/2026,09:00,11:00,Andy Wong,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Pack Down,AV L2\r
21/11/2026,11:00,14:30,Andy Wong,VIC-Melbourne Cricket Ground,1019639 - International T20 | Olympic B | 21.11.2026,Set Up,AV L2\r
22/11/2026,08:00,17:30,Andy Wong,VIC-Melbourne Showgrounds,1021770 - Indian High Tea and Dinner | VIC PAV,Operate,AV L2\r
21/11/2026,14:30,23:00,Andy Wong,VIC-Crown Towers,0966860 - AVIARY | Huy Tu & Belinda Duong's Wedding,Operate,Lighting L2\r
21/11/2026,07:30,08:30,Andy Wong,VIC-The Langham Melbourne,,,AV Meet & Greet\r
17/11/2026,14:30,15:00,Anik Ahmed,VIC-Melbourne Cricket Ground,1000432 - Members Health General Meeting & AHSA | Hassett,Set Up,AV L2\r
17/11/2026,17:45,18:00,Anik Ahmed,VIC-Melbourne Cricket Ground,1000443 - Members Health General Meeting & AHSA | Ryder,Set Up,AV L1\r
18/11/2026,07:00,08:15,Anik Ahmed,VIC-Melbourne Marriott Hotel,1003854 - Yarra Suites | TMEIC,Set Up,AV L1\r
18/11/2026,06:15,07:00,Anik Ahmed,VIC-Melbourne Marriott Hotel,1005651 - EXHIBITION | GETINGE,Set Up,AV Technician\r
17/11/2026,12:30,13:30,Anik Ahmed,VIC-Melbourne Cricket Ground,1011221 - WOMCC AGM | Long Room,Set Up,AV L2\r
19/11/2026,00:00,23:59,Anik Ahmed,VIC-Production,,,RDO\r
17/11/2026,16:00,17:30,Anik Ahmed,VIC-Melbourne Cricket Ground,0 - Non Event Shift (unbillable),,Venue Duties\r
20/11/2026,12:30,14:00,Anik Ahmed,VIC-Crown Towers,1004912 - Evergreen | Kubota CE Launch Dinner 2026,Pack Down,AV Technician\r
21/11/2026,14:30,16:30,Anik Ahmed,VIC-Pullman Melbourne Albert Park,1004868 - LAKE 1-2 | USANZ Trainee Week 2026,Turnaround,AV L2\r
22/11/2026,15:00,16:30,Anik Ahmed,VIC-Hyatt Place Essendon Fields,1016288 - Australia 1 2 3 & Atrium | Coaches Congress,Turnaround,EWP Spotter\r
21/11/2026,08:30,10:00,Anik Ahmed,VIC-Pullman Melbourne Albert Park,1017099 - GRAND 3-7 | WEDDING | Muy and Leroy,Set Up,AV L2\r
16/11/2026,00:00,23:59,Anik Ahmed,VIC-Production,,,RDO\r
20/11/2026,10:30,11:30,Anik Ahmed,VIC-The Langham Melbourne,1012159 - Alto - Brilliant by Langham Event,Turnaround,AV Technician\r
17/11/2026,17:30,18:00,Anik Ahmed,VIC-Melbourne Cricket Ground,1021176 - MCC Event Staff Induction Night | Ryder,Pack Down,AV L2\r
17/11/2026,14:00,14:30,Anik Ahmed,VIC-Melbourne Cricket Ground,0963222 - AATC Workshop - Day 1 Hasset,Pack Down,AV L2\r
18/11/2026,09:00,14:30,Anik Ahmed,VIC-Melb Marriott Hotel Docklands,1018062 - Observetory | Owners Meeting,Rehearsal,DES - L1 Digital Event Tech\r
17/11/2026,10:30,11:30,Anik Ahmed,VIC-Melbourne Cricket Ground,1018316 - Metro Senior Leadership Forum | MDR,Set Up,AV L2\r
17/11/2026,08:00,10:30,Anik Ahmed,VIC-Melbourne Cricket Ground,1018602 - Islamic College of Sport Graduation Dinner | MDR,Pack Down,AV L2\r
20/11/2026,16:00,18:00,Anik Ahmed,VIC-Crown Towers,1016510 - CCH | Community Collective Event,Pack Down,AV Technician\r
21/11/2026,12:30,14:30,Anik Ahmed,VIC-Pullman Melbourne Albert Park,,,AV Technician\r
17/11/2026,11:30,12:30,Anik Ahmed,VIC-Melbourne Cricket Ground,1019041 - MCC Netball Presentation Dinner | Long Room,Pack Down,AV L2\r
17/11/2026,15:30,16:00,Anik Ahmed,VIC-Melbourne Cricket Ground,1019292 - Richmond Football Club Foundation Dinner | CR,Set Up,AV L2\r
21/11/2026,10:00,12:30,Anik Ahmed,VIC-Pullman Melbourne Albert Park,1004880 - MULTIPLE | ORAL EXAMS,Set Up,AV L2\r
20/11/2026,18:00,21:30,Anik Ahmed,VIC-Crown Towers,1016512 - PROM | DINNER | Community Collective Event,Set Up,AV Technician\r
21/11/2026,08:00,08:30,Anik Ahmed,VIC-Pullman Melbourne Albert Park,1017534 - Park | Squash Aus,Rehearsal,AV Meet & Greet\r
20/11/2026,11:30,12:00,Anik Ahmed,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Travel time\r
22/11/2026,06:00,15:00,Anik Ahmed,VIC-Hyatt Place Essendon Fields,1016288 - Australia 1 2 3 & Atrium | Coaches Congress,,AV L2\r
20/11/2026,14:00,16:00,Anik Ahmed,VIC-Crown Towers,1005713 - HRZ | Midori Chui and Ming-Yiu Sebastian Wong Wedd,Turnaround,AV Technician\r
17/11/2026,07:30,08:30,Anna R,VIC-1 Hotel Melbourne,1019846 - Paperbark | RGF Staffing,Rehearsal,AV Meet & Greet\r
18/11/2026,07:00,07:30,Anna R,VIC-1 Hotel Melbourne,1017311 - Saltbush & Bracken | Maddocks,Set Up,AV Technician\r
18/11/2026,07:30,08:30,Anna R,VIC-1 Hotel Melbourne,1017311 - Saltbush & Bracken | Maddocks,Rehearsal,AV Meet & Greet\r
17/11/2026,09:00,17:00,Anne M,VIC-Warehouse And Ops,0 - Non Event Shift (unbillable),,Office\r
18/11/2026,08:00,15:00,Anne M,VIC-Warehouse And Ops,0 - Non Event Shift (unbillable),,Office\r
16/11/2026,09:00,17:00,Anne M,VIC-Warehouse And Ops,0 - Non Event Shift (unbillable),,Office\r
19/11/2026,09:00,17:00,Anne M,VIC-Warehouse And Ops,0 - Non Event Shift (unbillable),,Office\r
20/11/2026,09:00,17:00,Anne M,VIC-Warehouse And Ops,0 - Non Event Shift (unbillable),,Office\r
18/11/2026,10:30,13:30,Ashish Kafle,VIC-Crown Towers,1004912 - Evergreen | Kubota CE Launch Dinner 2026,Set Up,AV Technician\r
18/11/2026,13:30,17:00,Ashish Kafle,VIC-Crown Towers,1005319 - River | ANZ Proprietary Lending - Remote Awards Ni,Set Up,Audio L2\r
16/11/2026,09:30,12:30,Ashish Kafle,VIC-Crown Towers,1008256 - Horzion | Jioseva Vatuniveivuke & Linda Nguyen's W,Pack Down,AV Technician\r
16/11/2026,15:00,16:00,Ashish Kafle,VIC-Crown Towers,1016624 - M7 | Delta Agribusiness Supplier Review Meeting,Set Up,AV Technician\r
20/11/2026,00:30,10:30,Ashish Kafle,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,AV Technician\r
16/11/2026,12:30,13:30,Ashish Kafle,VIC-Crown Towers,1017303 - M10 | Schneider Electric Meeting,Set Up,AV Technician\r
16/11/2026,13:30,14:00,Ashish Kafle,VIC-Crown Towers,1017303 - M10 | Schneider Electric Meeting,Rehearsal,AV Meet & Greet\r
16/11/2026,18:30,19:00,Ashish Kafle,VIC-Crown Towers,1017303 - M10 | Schneider Electric Meeting,Pack Down,AV Technician\r
16/11/2026,14:00,15:00,Ashish Kafle,VIC-Crown Towers,1017321 - M1 | Carbonhalo AASB S2 Briefing,Set Up,AV Technician\r
16/11/2026,16:00,18:30,Ashish Kafle,VIC-Crown Towers,1020059 - River 1 | AICC Boardroom - November 2026,Set Up,AV Technician\r
17/11/2026,17:45,18:30,Ashish Kafle,VIC-Crown Towers,1017313 - Evergreen | Australian Corporate Games Awards Part,Rehearsal,AV Meet & Greet\r
18/11/2026,07:30,10:30,Ashish Kafle,VIC-Crown Towers,1017900 - Horizon | Tim Donohue Client Farewell Lunch,Set Up,AV Technician\r
17/11/2026,07:00,17:45,Ashish Kafle,VIC-Crown Towers,1015344 - Garden Room 2&3 | Iron Mountain Meeting,Rehearsal,Audio L2\r
19/11/2026,00:00,23:59,Ashish Kafle,VIC-Production,,,RDO\r
21/11/2026,00:00,23:59,Ashish Kafle,VIC-Production,,,RDO\r
22/11/2026,00:00,23:59,Ashish Kafle,VIC-Production,,,RDO\r
21/11/2026,06:30,15:30,Audrey Fraser-R,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Turnaround,AV Technician\r
19/11/2026,08:00,10:00,Ayon Rndnbndra,VIC-Pullman Melbourne Albert Park,1020173 - GRAND | Matchroom Boxing,Pack Down,Style and Design\r
20/11/2026,00:30,10:30,Ayon Rndnbndra,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,AV Technician\r
16/11/2026,06:00,07:00,Bobby Maguire,VIC-The Langham Melbourne,0981436 - Alto | AgLink Members Meeting,Set Up,AV L2\r
16/11/2026,08:00,08:30,Bobby Maguire,VIC-The Langham Melbourne,1007952 - Yarra | Patrick Terminals,Set Up,AV Technician\r
16/11/2026,09:00,09:30,Bobby Maguire,VIC-The Langham Melbourne,1015168 - Little Yarra - JTB - YAMAUCHI CO LTD,Set Up,AV Technician\r
16/11/2026,09:30,10:30,Bobby Maguire,VIC-The Langham Melbourne,1021411 - Swanston | First 60 Orientation,Set Up,AV Technician\r
17/11/2026,08:00,08:30,Bobby Maguire,VIC-The Langham Melbourne,1015168 - Little Yarra - JTB - YAMAUCHI CO LTD,Rehearsal,AV Meet & Greet\r
17/11/2026,16:30,17:00,Bobby Maguire,VIC-The Langham Melbourne,1015168 - Little Yarra - JTB - YAMAUCHI CO LTD,Pack Down,AV Technician\r
17/11/2026,08:30,09:00,Bobby Maguire,VIC-The Langham Melbourne,1021411 - Swanston | First 60 Orientation,Rehearsal,AV Meet & Greet\r
20/11/2026,06:30,16:30,Bobby Maguire,VIC-The Langham Melbourne,0967042 - Ballroom - Department of Neurosurgery,Operate,AV L2\r
20/11/2026,16:30,18:00,Bobby Maguire,VIC-The Langham Melbourne,0967042 - Ballroom - Department of Neurosurgery,Pack Down,AV Technician\r
17/11/2026,17:30,18:00,Bobby Maguire,VIC-The Langham Melbourne,0976056 - Flinders | Renaissance Tours - Day 1,Rehearsal,AV Meet & Greet\r
21/11/2026,00:00,23:59,Bobby Maguire,VIC-The Langham Melbourne,,,RDO\r
22/11/2026,00:00,23:59,Bobby Maguire,VIC-The Langham Melbourne,,,RDO\r
17/11/2026,17:00,17:30,Bobby Maguire,VIC-The Langham Melbourne,0976056 - Flinders | Renaissance Tours - Day 1,Set Up,AV Technician\r
17/11/2026,09:00,12:00,Bobby Maguire,VIC-The Langham Melbourne,0967042 - Ballroom - Department of Neurosurgery,Set Up,AV L2\r
18/11/2026,06:00,18:00,Bobby Maguire,VIC-The Langham Melbourne,0967042 - Ballroom - Department of Neurosurgery,Operate,AV L2\r
19/11/2026,06:30,18:00,Bobby Maguire,VIC-The Langham Melbourne,0967042 - Ballroom - Department of Neurosurgery,Operate,AV L2\r
18/11/2026,08:30,10:00,Boden Tennent,VIC-The Langham Melbourne,1007952 - Yarra | Patrick Terminals,Rehearsal,AV Meet & Greet\r
22/11/2026,09:00,11:30,Boden Tennent,VIC-Melbourne Cricket Ground,1018334 - 1956 Olympics Anniversary Lunch | Olympic,Set Up,AV L2\r
22/11/2026,13:00,16:00,Boden Tennent,VIC-Melbourne Cricket Ground,1018334 - 1956 Olympics Anniversary Lunch | Olympic,Operate,AV L2\r
21/11/2026,11:00,14:30,Boden Tennent,VIC-Melbourne Cricket Ground,1019639 - International T20 | Olympic B | 21.11.2026,Set Up,AV L2\r
22/11/2026,07:30,09:00,Boden Tennent,VIC-Melbourne Cricket Ground,1019639 - International T20 | Olympic B | 21.11.2026,Pack Down,AV L2\r
21/11/2026,08:30,09:00,Boden Tennent,VIC-Melbourne Cricket Ground,0 - Non Event Shift (unbillable),,Prep\r
21/11/2026,09:00,11:00,Boden Tennent,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Pack Down,AV L2\r
22/11/2026,12:00,13:00,Boden Tennent,VIC-Melbourne Cricket Ground,1021256 - 1956 Olympics Pre-Event | Betty Cuthbert Bar,Rehearsal,AV Meet & Greet\r
18/11/2026,10:00,15:30,Boden Tennent,VIC-Crown Towers,0998372 - Promenade 1 & 2 | Finsure & Loankit PD Day '26,Operate,AV L2\r
16/11/2026,07:30,09:00,Charlie Gates,VIC-Hilton Melb Little Queen St,,,AV Meet & Greet\r
18/11/2026,07:30,08:00,Charlie Gates,VIC-Pan Pacific Melbourne,1021171 - Woodside 1 | Amex Breakout Room 18/11,Set Up,AV Technician\r
18/11/2026,08:00,08:30,Charlie Gates,VIC-Pan Pacific Melbourne,1021171 - Woodside 1 | Amex Breakout Room 18/11,Rehearsal,AV Meet & Greet\r
20/11/2026,12:00,13:00,Charlie Gates,VIC-Crowne Plaza Melbourne,1021401 - Exhibition | Kapitol Group | 20.11..26,Rehearsal,AV Meet & Greet\r
21/11/2026,12:30,18:30,Charlie Gates,VIC-1 Hotel Melbourne,1017025 - Set | NAB Platinum Awards,Set Up,Lighting - GMA3\r
21/11/2026,10:00,11:00,Charlie Gates,VIC-The Langham Melbourne,1003972 - Alto - Wedding of Angela & Ryan,Turnaround,AV Technician\r
20/11/2026,00:30,10:30,Charlie Newman,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,Cancelled Shift - UNPAID\r
16/11/2026,07:00,18:00,Chris Peters,VIC-Pullman Melbourne Albert Park,1010655 - Lake 1-4 | ANZCA Primary Refresher,Operate,AV L2\r
18/11/2026,07:30,17:30,Chris Peters,VIC-Pullman Melbourne Albert Park,1010655 - Lake 1-4 | ANZCA Primary Refresher,Operate,AV L2\r
19/11/2026,07:30,17:30,Chris Peters,VIC-Pullman Melbourne Albert Park,1010655 - Lake 1-4 | ANZCA Primary Refresher,Operate,AV L2\r
21/11/2026,14:30,16:30,Chris Peters,VIC-Pullman Melbourne Albert Park,1004868 - LAKE 1-2 | USANZ Trainee Week 2026,Turnaround,Crewleader\r
21/11/2026,08:30,10:00,Chris Peters,VIC-Pullman Melbourne Albert Park,1017099 - GRAND 3-7 | WEDDING | Muy and Leroy,Set Up,Crewleader\r
22/11/2026,12:00,15:00,Chris Peters,VIC-Pullman Melbourne Albert Park,1017099 - GRAND 3-7 | WEDDING | Muy and Leroy,Pack Down,Crewleader\r
20/11/2026,07:30,18:00,Chris Peters,VIC-Pullman Melbourne Albert Park,1010655 - Lake 1-4 | ANZCA Primary Refresher,Operate,AV L2\r
19/11/2026,17:30,18:30,Chris Peters,VIC-Pullman Melbourne Albert Park,1021426 - Element | Federation Uni,Set Up,AV Technician\r
22/11/2026,11:00,12:00,Chris Peters,VIC-Pullman Melbourne Albert Park,1020908 - ALBERT | World Options Australia,Set Up,AV Technician\r
17/11/2026,00:00,23:59,Chris Peters,VIC-Pullman Melbourne Albert Park,,,RDO\r
21/11/2026,12:30,14:30,Chris Peters,VIC-Pullman Melbourne Albert Park,,,Crewleader\r
21/11/2026,08:00,08:30,Chris Peters,VIC-Pullman Melbourne Albert Park,1004857 - VICTORIA | USANZ Trainee Week 2026,Rehearsal,AV Meet & Greet\r
21/11/2026,16:30,17:00,Chris Peters,VIC-Pullman Melbourne Albert Park,1004857 - VICTORIA | USANZ Trainee Week 2026,Pack Down,AV Technician\r
21/11/2026,10:00,12:30,Chris Peters,VIC-Pullman Melbourne Albert Park,1004880 - MULTIPLE | ORAL EXAMS,Set Up,Crewleader\r
22/11/2026,17:00,18:00,Chris Peters,VIC-Pullman Melbourne Albert Park,1004880 - MULTIPLE | ORAL EXAMS,Pack Down,AV Technician\r
22/11/2026,15:00,17:00,Chris Peters,VIC-Pullman Melbourne Albert Park,1004883 - STATE 3 | USANZ Trainee Week 2026,Set Up,Crewleader\r
22/11/2026,18:00,19:30,Chris Peters,VIC-Pullman Melbourne Albert Park,1010655 - Lake 1-4 | ANZCA Primary Refresher,Turnaround,AV L2\r
16/11/2026,08:30,12:00,Chris Ruffles,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Operate,Sick\r
16/11/2026,13:30,17:00,Chris Ruffles,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),,Sick\r
16/11/2026,12:00,13:00,Chris Ruffles,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),,Sick\r
16/11/2026,13:00,13:30,Chris Ruffles,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),,Sick\r
16/11/2026,13:00,14:00,Chris Ruffles,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Set Up,Sick\r
19/11/2026,14:00,17:00,Chris Ruffles,VIC-CENTREPIECE,1010696 - GH FULL EAST | Sports AUS Hall Of Fame (SAHOF),,Sick\r
17/11/2026,14:30,17:00,Chris Ruffles,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Turnaround,Sick\r
19/11/2026,07:30,11:30,Chris Ruffles,VIC-CENTREPIECE,1015909 - Auditorium | DJSIR End-of-Year Event,Operate,Sick\r
19/11/2026,12:00,14:00,Chris Ruffles,VIC-CENTREPIECE,1015909 - Auditorium | DJSIR End-of-Year Event,Pack Down,Sick\r
21/11/2026,00:30,23:59,Chris Ruffles,VIC-CENTREPIECE,,,RDO\r
22/11/2026,00:00,23:59,Chris Ruffles,VIC-CENTREPIECE,,,RDO\r
17/11/2026,05:30,15:30,Chris Ruffles,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Operate,Sick\r
18/11/2026,16:30,17:00,Colleen M,VIC-1 Hotel Melbourne,1015441 - Rivergrass | Volvo Comparison Meeting,Pack Down,AV Technician\r
18/11/2026,16:00,16:30,Colleen M,VIC-1 Hotel Melbourne,1017311 - Saltbush & Bracken | Maddocks,Pack Down,AV Technician\r
16/11/2026,00:00,23:59,Connor Wells,VIC-CENTREPIECE,,,RDO\r
21/11/2026,08:00,12:00,Connor Wells,VIC-CENTREPIECE,1018471 - GH | AFL W Awards 2026,Turnaround,Crewleader\r
20/11/2026,09:00,11:30,Connor Wells,VIC-Melbourne Cricket Ground,1019305 - Celebration of Life for Ian Edney | MDR,Set Up,AV L1\r
20/11/2026,14:30,15:30,Connor Wells,VIC-Melbourne Cricket Ground,1019305 - Celebration of Life for Ian Edney | MDR,Pack Down,AV L1\r
18/11/2026,15:30,23:00,Connor Wells,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Operate,Audio FOH\r
22/11/2026,00:00,23:59,Connor Wells,VIC-CENTREPIECE,,,RDO\r
19/11/2026,14:00,17:00,Connor Wells,VIC-CENTREPIECE,1010696 - GH FULL EAST | Sports AUS Hall Of Fame (SAHOF),Set Up,Crewleader\r
20/11/2026,11:30,12:30,Connor Wells,VIC-Melbourne Cricket Ground,1011221 - WOMCC AGM | Long Room,Pack Down,AV L1\r
20/11/2026,13:00,14:00,Connor Wells,VIC-Melbourne Cricket Ground,1012231 - Men’s International T20I Series Australia V Englan,Set Up,AV L1\r
19/11/2026,09:00,14:00,Connor Wells,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Set Up,Crewleader\r
20/11/2026,14:00,14:30,Connor Wells,VIC-Melbourne Cricket Ground,1000432 - Members Health General Meeting & AHSA | Hassett,Pack Down,AV L1\r
20/11/2026,08:00,09:00,Connor Wells,VIC-Melbourne Cricket Ground,1003375 - Mater Christi 2026 Valedictory | MDR,Pack Down,AV L1\r
21/11/2026,12:30,18:30,Connor Wells,VIC-1 Hotel Melbourne,1017025 - Set | NAB Platinum Awards,Set Up,Audio L2\r
20/11/2026,15:30,16:00,Connor Wells,VIC-Melbourne Cricket Ground,1017124 - Westbourne Grammar School - 2026 Valedictory - MDR,Set Up,AV L1\r
17/11/2026,11:00,13:30,Cooper Waldhorn,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Technician On Duty\r
20/11/2026,12:30,14:00,Cooper Waldhorn,VIC-Crown Towers,1004912 - Evergreen | Kubota CE Launch Dinner 2026,Pack Down,AV Technician\r
16/11/2026,18:30,00:00,Cooper Waldhorn,VIC-Crown Towers,0973429 - CCH 1&2 | OT  ICS & SCADA Automation Conference,Set Up,AV Technician\r
16/11/2026,13:30,16:00,Cooper Waldhorn,VIC-Crown Towers,1015344 - Garden Room 2&3 | Iron Mountain Meeting,Set Up,AV Technician\r
19/11/2026,17:30,22:00,Cooper Waldhorn,VIC-Crown Towers,1011049 - 28 | NAB Dinner,Pack Down,AV Technician\r
20/11/2026,10:30,11:30,Cooper Waldhorn,VIC-The Langham Melbourne,1012159 - Alto - Brilliant by Langham Event,Turnaround,AV Technician\r
16/11/2026,16:00,18:30,Cooper Waldhorn,VIC-Crown Towers,1020059 - River 1 | AICC Boardroom - November 2026,Set Up,AV Technician\r
16/11/2026,23:59,00:30,Cooper Waldhorn,VIC-Crown Towers,1021290 - CCH foyer | Exhibitor Stand 16 | OT  ICS&SCADA Aut,Set Up,AV Technician\r
18/11/2026,15:00,23:30,Cooper Waldhorn,VIC-Crown Towers,0966857 - Pal | Frankston High School Valedictory Dinner '26,Operate,Audio FOH\r
17/11/2026,13:30,16:00,Cooper Waldhorn,VIC-Crown Towers,1017313 - Evergreen | Australian Corporate Games Awards Part,Set Up,AV Technician\r
19/11/2026,16:00,17:30,Cooper Waldhorn,VIC-Crown Towers,1016510 - CCH | Community Collective Event,Set Up,AV Technician\r
20/11/2026,16:00,18:00,Cooper Waldhorn,VIC-Crown Towers,1016510 - CCH | Community Collective Event,Pack Down,AV Technician\r
20/11/2026,18:00,21:30,Cooper Waldhorn,VIC-Crown Towers,1016512 - PROM | DINNER | Community Collective Event,Set Up,AV Technician\r
21/11/2026,00:00,23:59,Cooper Waldhorn,VIC-Production,,,RDO\r
22/11/2026,00:00,23:59,Cooper Waldhorn,VIC-Production,,,RDO\r
20/11/2026,11:30,12:00,Cooper Waldhorn,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Travel time\r
17/11/2026,19:30,21:30,Cooper Waldhorn,VIC-Crown Towers,0998372 - Promenade 1 & 2 | Finsure & Loankit PD Day '26,Set Up,AV Technician\r
17/11/2026,16:00,19:30,Cooper Waldhorn,VIC-Crown Towers,1020235 - Garden | GACM International Forum 2026,Set Up,AV Technician\r
19/11/2026,12:00,16:00,Cooper Waldhorn,VIC-Crown Towers,1017952 - RIVER 2&3 | Switch Property Meeting,Set Up,AV Technician\r
20/11/2026,14:00,16:00,Cooper Waldhorn,VIC-Crown Towers,1005713 - HRZ | Midori Chui and Ming-Yiu Sebastian Wong Wedd,Turnaround,AV Technician\r
19/11/2026,06:00,09:00,Cormack Pratt,VIC-Hyde Melbourne Place,1015513 - Olive | FloQast,Rehearsal,AV Meet & Greet\r
19/11/2026,07:00,08:00,Cory Welsh,VIC-Melbourne Cricket Ground,1000427 - Members Health General Meeting & AHSA | JSG,Rehearsal,AV Meet & Greet\r
16/11/2026,16:00,22:30,Cory Welsh,VIC-Melbourne Cricket Ground,1018602 - Islamic College of Sport Graduation Dinner | MDR,Operate,Audio L2\r
18/11/2026,12:30,15:30,Cory Welsh,VIC-CENTREPIECE,1015909 - Auditorium | DJSIR End-of-Year Event,Set Up,AV L1\r
19/11/2026,14:00,17:00,Cory Welsh,VIC-CENTREPIECE,1010696 - GH FULL EAST | Sports AUS Hall Of Fame (SAHOF),Set Up,EWP OP\r
18/11/2026,15:30,17:30,Cory Welsh,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Operate,AV Technician\r
17/11/2026,12:00,13:00,Cory Welsh,VIC-CENTREPIECE,1022421 - Auditorium | MOPT - Precinct Update,Set Up,AV L1\r
17/11/2026,13:00,17:00,Cory Welsh,VIC-CENTREPIECE,1022421 - Auditorium | MOPT - Precinct Update,Operate,DES - L1 Digital Event Tech\r
17/11/2026,10:30,11:30,Cory Welsh,VIC-Melbourne Cricket Ground,1018316 - Metro Senior Leadership Forum | MDR,Set Up,AV L1\r
17/11/2026,08:30,10:30,Cory Welsh,VIC-Melbourne Cricket Ground,1018602 - Islamic College of Sport Graduation Dinner | MDR,Pack Down,AV L1\r
20/11/2026,13:00,15:00,Cory Welsh,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Operate,Training\r
20/11/2026,15:00,00:00,Cory Welsh,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Operate,Vision L2\r
21/11/2026,00:00,23:59,Cory Welsh,VIC-CENTREPIECE,,,RDO\r
22/11/2026,00:00,23:59,Cory Welsh,VIC-CENTREPIECE,,,RDO\r
19/11/2026,09:00,14:00,Cory Welsh,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Set Up,AV Technician\r
19/11/2026,08:00,09:00,Damo A,VIC-Events Flemington,,,Transfer - R2\r
16/11/2026,09:00,11:30,Dan Richards,VIC-AC Hotel By Marriott Melb SB,,,Transfer - R2\r
17/11/2026,07:00,08:00,Dan Richards,VIC-Melbourne Marriott Hotel,1002824 - Yarra Suites | Getinge,Set Up,AV Technician\r
17/11/2026,08:00,08:30,Dan Richards,VIC-Melbourne Marriott Hotel,1002824 - Yarra Suites | Getinge,Rehearsal,AV Meet & Greet\r
18/11/2026,07:00,08:15,Dan Richards,VIC-Melbourne Marriott Hotel,1003854 - Yarra Suites | TMEIC,Set Up,AV Technician\r
18/11/2026,08:15,08:30,Dan Richards,VIC-Melbourne Marriott Hotel,1003854 - Yarra Suites | TMEIC,Rehearsal,AV Meet & Greet\r
18/11/2026,08:30,08:45,Dan Richards,VIC-Melbourne Marriott Hotel,1005651 - EXHIBITION | GETINGE,Rehearsal,AV Meet & Greet\r
19/11/2026,10:30,11:00,Dan Richards,VIC-Pan Pacific Melbourne,1007459 - Woodside 1 | Buyer Foresight,Set Up,Cancelled Shift - UNPAID\r
19/11/2026,11:00,11:30,Dan Richards,VIC-Pan Pacific Melbourne,1007459 - Woodside 1 | Buyer Foresight,Rehearsal,Cancelled Shift - UNPAID\r
19/11/2026,10:00,10:30,Dan Richards,VIC-Pan Pacific Melbourne,,,Cancelled Shift - UNPAID\r
17/11/2026,14:30,15:00,Dan Richards,VIC-Hyde Melbourne Place,0 - Non Event Shift (unbillable),,Travel time\r
17/11/2026,10:30,11:30,Dan Richards,VIC-Melbourne Marriott Hotel,1021874 - Moojer | Amazon LLC | 18-19.11.26,,AV Technician\r
19/11/2026,09:30,10:00,Dan Richards,VIC-Westin Melbourne,0 - Non Event Shift (unbillable),,Venue Duties\r
19/11/2026,11:30,12:30,Dan Richards,VIC-Pan Pacific Melbourne,0 - Non Event Shift (unbillable),,Cancelled Shift - UNPAID\r
19/11/2026,12:30,13:00,Dan Richards,VIC-Pan Pacific Melbourne,,,Cancelled Shift - UNPAID\r
18/11/2026,08:45,11:30,Dan Richards,VIC-Melbourne Marriott Hotel,0 - Non Event Shift (unbillable),,Venue Duties\r
17/11/2026,10:00,10:30,Dan Richards,VIC-Melbourne Marriott Hotel,1002824 - Yarra Suites | Getinge,Turnaround,AV Technician\r
16/11/2026,07:30,09:00,Dan Richards,VIC-AC Hotel By Marriott Melb SB,1018113 - Miro | Teva Pharmaceutical,Rehearsal,DES - L1 Digital Event Tech\r
19/11/2026,07:00,08:00,Dan Richards,VIC-Westin Melbourne,1011280 - Westin III | Slipstream Group,Rehearsal,AV Meet & Greet\r
19/11/2026,13:00,14:00,Dan Richards,VIC-Hyde Melbourne Place,1015513 - Olive | FloQast,Pack Down,AV Technician\r
19/11/2026,08:00,09:30,Dan Richards,VIC-Westin Melbourne,1004158 - Wine Room | World Vision Australia,Rehearsal,AV Meet & Greet\r
21/11/2026,00:00,23:59,Dan Richards,VIC-Production,0 - Non Event Shift (unbillable),,RDO\r
22/11/2026,00:00,23:59,Dan Richards,VIC-Production,0 - Non Event Shift (unbillable),,RDO\r
17/11/2026,08:30,09:00,Dan Richards,VIC-Melbourne Marriott Hotel,1019835 - Boardroom 103 | Envu VIP Meeting,Pack Down,AV Technician\r
17/11/2026,15:00,17:00,Dan Richards,VIC-Hyde Melbourne Place,1021979 - Emerald | HYDE Melbourne Place,Set Up,AV Meet & Greet\r
19/11/2026,14:00,16:00,Dan Richards,VIC-Hyde Melbourne Place,1015513 - Olive | FloQast,,Transfer\r
18/11/2026,13:00,14:30,Dan Richards,VIC-Hyde Melbourne Place,1015513 - Olive | FloQast,,Transfer\r
18/11/2026,11:30,12:00,Dan Richards,VIC-Melbourne Marriott Hotel,1017826 - B103 | Global Footcare,Set Up,AV L1\r
18/11/2026,12:00,12:30,Dan Richards,VIC-Melbourne Marriott Hotel,1017826 - B103 | Global Footcare,Rehearsal,AV Meet & Greet\r
19/11/2026,08:30,09:00,Dan Richards,VIC-Westin Melbourne,1019113 - Westin IV | Patek Philippe,Rehearsal,AV Meet & Greet\r
20/11/2026,07:30,17:00,Dan Richards,VIC-Hilton Melb Little Queen St,1002919 - G+C | Phonak Lyric,Operate,AV L2\r
20/11/2026,17:00,18:00,Dan Richards,VIC-Hilton Melb Little Queen St,1002919 - G+C | Phonak Lyric,Pack Down,AV Technician\r
20/11/2026,12:00,00:30,Dane Travers,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Operate,Technical Director Production\r
17/11/2026,08:30,09:00,Daniel L,VIC-Parkroyal Melbourne Airport,,,Office\r
17/11/2026,07:00,07:30,Daniel L,VIC-Parkroyal Melbourne Airport,,,Office\r
17/11/2026,08:30,09:00,Daniel L,VIC-Parkroyal Melbourne Airport,1013487 - DayBall | Alfa Laval | 17.11.26,,Office\r
16/11/2026,09:30,10:00,Daniel L,VIC-Parkroyal Melbourne Airport,1012594 - DayBall | Boehringer-Ingelheim | 16.11.26,,Office\r
17/11/2026,09:00,11:00,Daniel L,VIC-Parkroyal Melbourne Airport,1012050 - BenWang | Out There Productions | 18.11,,Office\r
18/11/2026,08:30,09:00,Daniel L,VIC-Parkroyal Melbourne Airport,1018834 - Macedon | Legal Professional Training | 18.11.26,,Office\r
20/11/2026,09:30,10:00,Daniel L,VIC-Parkroyal Melbourne Airport,,,Office\r
20/11/2026,15:45,16:00,Daniel Pusetic,VIC-Pullman Melbourne Albert Park,1017534 - Park | Squash Aus,Set Up,AV Technician\r
18/11/2026,12:00,14:30,Daniel Yeaman,VIC-The Langham Melbourne,1010477 - Alto | Brightedge Event,Turnaround,AV Technician\r
18/11/2026,16:30,17:00,Daniel Yeaman,VIC-The Langham Melbourne,1022406 - Flinders - Stage & Screen - Cricket Aus,Set Up,AV Technician\r
20/11/2026,09:00,11:30,Daniel Yeaman,VIC-Melbourne Cricket Ground,1019305 - Celebration of Life for Ian Edney | MDR,Set Up,AV L2\r
20/11/2026,15:30,16:30,Daniel Yeaman,VIC-Melbourne Cricket Ground,1019305 - Celebration of Life for Ian Edney | MDR,Pack Down,AV L2\r
20/11/2026,12:30,13:00,Daniel Yeaman,VIC-Melbourne Cricket Ground,1019430 - MCC Permanent Staff - Elevate Training | Legends,Pack Down,Cancelled Shift - UNPAID\r
16/11/2026,06:00,07:00,Daniel Yeaman,VIC-The Langham Melbourne,0981436 - Alto | AgLink Members Meeting,Set Up,AV L2\r
16/11/2026,07:00,17:00,Daniel Yeaman,VIC-The Langham Melbourne,0981436 - Alto | AgLink Members Meeting,Operate,AV L2\r
22/11/2026,00:00,23:59,Daniel Yeaman,VIC-Base Event Delivery,,,RDO\r
19/11/2026,15:00,17:00,Daniel Yeaman,VIC-The Langham Melbourne,1010477 - Alto | Brightedge Event,Turnaround,AV Technician\r
20/11/2026,11:30,12:30,Daniel Yeaman,VIC-Melbourne Cricket Ground,1011221 - WOMCC AGM | Long Room,Pack Down,AV L2\r
19/11/2026,18:00,19:00,Daniel Yeaman,VIC-The Langham Melbourne,1012159 - Alto - Brilliant by Langham Event,Operate,AV L2\r
20/11/2026,13:00,14:00,Daniel Yeaman,VIC-Melbourne Cricket Ground,1012231 - Men’s International T20I Series Australia V Englan,Set Up,AV L2\r
16/11/2026,18:00,18:30,Daniel Yeaman,VIC-AC Hotel By Marriott Melb SB,1018113 - Miro | Teva Pharmaceutical,Pack Down,Cancelled Shift - UNPAID\r
20/11/2026,17:00,17:30,Daniel Yeaman,VIC-The Langham Melbourne,0997807 - Swanston | Real Estate Dynamics Event,Pack Down,AV Technician\r
21/11/2026,00:00,23:59,Daniel Yeaman,VIC-Base Event Delivery,,,RDO\r
17/11/2026,08:00,20:30,Daniel Yeaman,VIC-The Langham Melbourne,0981436 - Alto | AgLink Members Meeting,Operate,AV L2\r
18/11/2026,08:00,12:00,Daniel Yeaman,VIC-The Langham Melbourne,0981436 - Alto | AgLink Members Meeting,Operate,AV L2\r
20/11/2026,14:00,14:30,Daniel Yeaman,VIC-Melbourne Cricket Ground,1000432 - Members Health General Meeting & AHSA | Hassett,Pack Down,AV L2\r
20/11/2026,08:00,09:00,Daniel Yeaman,VIC-Melbourne Cricket Ground,1003375 - Mater Christi 2026 Valedictory | MDR,Pack Down,AV L2\r
20/11/2026,16:30,17:00,Daniel Yeaman,VIC-Melbourne Cricket Ground,1017124 - Westbourne Grammar School - 2026 Valedictory - MDR,Set Up,AV L2\r
16/11/2026,11:30,12:30,Daniel Kepper,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),,Pre-production\r
16/11/2026,12:30,13:00,Daniel Kepper,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),,Pre-production\r
16/11/2026,08:30,11:30,Daniel Kepper,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Set Up,AV L1\r
18/11/2026,08:30,17:00,Daniel Kepper,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),,Technician On Duty\r
16/11/2026,07:45,08:00,Daniel Kepper,VIC-Melbourne Marriott Hotel,1019835 - Boardroom 103 | Envu VIP Meeting,Set Up,AV Technician\r
16/11/2026,08:00,08:30,Daniel Kepper,VIC-Melbourne Marriott Hotel,1019835 - Boardroom 103 | Envu VIP Meeting,Rehearsal,AV Meet & Greet\r
16/11/2026,13:30,16:00,Daniel Kepper,VIC-CENTREPIECE,1022421 - Auditorium | MOPT - Precinct Update,Set Up,Crewleader\r
17/11/2026,15:30,17:00,Daniel Kepper,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Turnaround,AV L2\r
20/11/2026,08:30,15:00,Daniel Kepper,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),,Transfer - R2\r
22/11/2026,00:00,23:59,Daniel Kepper,VIC-CENTREPIECE,,,RDO\r
19/11/2026,14:00,17:00,Daniel Kepper,VIC-CENTREPIECE,1010696 - GH FULL EAST | Sports AUS Hall Of Fame (SAHOF),Set Up,EWP OP\r
17/11/2026,14:00,14:30,Daniel Kepper,VIC-CENTREPIECE,1021429 - GH1 | We Are Carlisle - Breakout,Pack Down,AV L1\r
20/11/2026,11:30,12:00,Daniel Kepper,VIC-CENTREPIECE,1021446 - SABB | Mic Hire - 21-11-26,Set Up,AV Technician\r
20/11/2026,13:00,15:00,Daniel Kepper,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Operate,Lighting Pinspot Prog\r
21/11/2026,00:00,23:59,Daniel Kepper,VIC-CENTREPIECE,,,RDO\r
19/11/2026,09:00,14:00,Daniel Kepper,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Set Up,AV L1\r
17/11/2026,05:30,15:30,Daniel Kepper,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Operate,Audio L2\r
16/11/2026,08:00,16:00,DarrenLangsford,VIC-Warehouse And Ops,,,Warehouse\r
19/11/2026,08:00,16:00,DarrenLangsford,VIC-Warehouse And Ops,,,Warehouse\r
20/11/2026,08:00,16:00,DarrenLangsford,VIC-Warehouse And Ops,,,Warehouse\r
17/11/2026,13:00,18:00,DarrenLangsford,VIC-Warehouse And Ops,,,Warehouse\r
18/11/2026,08:00,16:00,DarrenLangsford,VIC-Warehouse And Ops,,,Warehouse\r
20/11/2026,14:00,00:30,Dilan Olliver,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Operate,Audio Senior\r
19/11/2026,06:30,13:30,Dilan Olliver,VIC-Melbourne Cricket Ground,1018316 - Metro Senior Leadership Forum | MDR,Operate,AV L2\r
19/11/2026,14:00,16:00,Dilan Olliver,VIC-Melbourne Cricket Ground,1018316 - Metro Senior Leadership Forum | MDR,Pack Down,Crewleader\r
16/11/2026,07:00,18:30,Dilan Olliver,VIC-Melbourne Cricket Ground,1012390 - Goodstart - Vic Conference & Dinner - Olympic,Set Up,AV L2\r
17/11/2026,07:00,17:30,Dilan Olliver,VIC-Melbourne Cricket Ground,1012390 - Goodstart - Vic Conference & Dinner - Olympic,Operate,AV L2\r
21/11/2026,00:30,23:59,Dilan Olliver,VIC-Melbourne Cricket Ground,,,RDO\r
22/11/2026,00:00,23:59,Dilan Olliver,VIC-Melbourne Cricket Ground,,,RDO\r
18/11/2026,06:30,17:00,Dilan Olliver,VIC-Melbourne Cricket Ground,0962842 - Melbourne Immunotherapy Network | Olympic,Operate,AV L2\r
19/11/2026,16:00,17:30,Dilan Olliver,VIC-Melbourne Cricket Ground,1003375 - Mater Christi 2026 Valedictory | MDR,Set Up,Crewleader\r
18/11/2026,08:30,16:30,Elias Hodson,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Prep\r
19/11/2026,17:30,18:30,Elias Hodson,VIC-Crown Towers,1017952 - RIVER 2&3 | Switch Property Meeting,Operate,AV Meet & Greet\r
16/11/2026,08:30,16:30,Elias Hodson,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Prep\r
18/11/2026,11:00,11:30,Elias Hodson,VIC-Crown Towers,1017900 - Horizon | Tim Donohue Client Farewell Lunch,Rehearsal,AV Meet & Greet\r
19/11/2026,08:30,16:30,Elias Hodson,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Prep\r
19/11/2026,08:00,08:30,Elias Hodson,VIC-Crown Towers,1016624 - M7 | Delta Agribusiness Supplier Review Meeting,Rehearsal,AV Meet & Greet\r
19/11/2026,18:30,19:00,Elias Hodson,VIC-Crown Towers,1016624 - M7 | Delta Agribusiness Supplier Review Meeting,Pack Down,AV Technician\r
19/11/2026,19:00,19:30,Elias Hodson,VIC-Crown Towers,1017067 - M10 | Nufarm NOV Meeting,Pack Down,AV Technician\r
20/11/2026,08:30,09:00,Felix Webb,VIC-Westin Melbourne,1019113 - Westin IV | Patek Philippe,Rehearsal,AV Meet & Greet\r
20/11/2026,07:00,07:30,Felix Webb,VIC-Westin Melbourne,1019113 - Westin IV | Patek Philippe,Set Up,AV Meet & Greet\r
19/11/2026,07:30,09:00,Felix Webb,VIC-Hilton Melb Little Queen St,1016798 - Gorman & Chambers | Team 400,,AV Meet & Greet\r
20/11/2026,08:00,08:30,Felix Webb,VIC-Westin Melbourne,1011280 - Westin III | Slipstream Group,Rehearsal,AV Meet & Greet\r
18/11/2026,07:30,09:00,Felix Webb,VIC-Hilton Melb Little Queen St,1016798 - Gorman & Chambers | Team 400,Rehearsal,AV Meet & Greet\r
20/11/2026,09:00,10:00,Felix Webb,VIC-Westin Melbourne,0 - Non Event Shift (unbillable),,Transfer\r
20/11/2026,07:30,08:00,Felix Webb,VIC-Westin Melbourne,1011280 - Westin III | Slipstream Group,Set Up,AV Meet & Greet\r
16/11/2026,00:00,23:59,Fil Fillin,VIC-Pullman Melbourne Albert Park,,,RDO\r
19/11/2026,13:00,16:00,Fil Fillin,VIC-Pullman Melbourne Albert Park,1006555 - Grand 1-6 | Mac Robertson Girls School Grad,Set Up,AV L2\r
18/11/2026,13:00,23:00,Fil Fillin,VIC-Pullman Melbourne Albert Park,1022031 - X-Hire | Matchroom,Operate,Lighting - GMA3\r
20/11/2026,15:00,23:30,Fil Fillin,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Operate,Lighting Senior\r
22/11/2026,00:00,23:59,Fil Fillin,VIC-Pullman Melbourne Albert Park,,,RDO\r
17/11/2026,08:30,17:00,Fil Fillin,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Set Up,Pre-production\r
19/11/2026,17:00,00:00,Fil Fillin,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Set Up,Lighting Senior\r
18/11/2026,23:00,01:00,Fil Fillin,VIC-Pullman Melbourne Albert Park,1020173 - GRAND | Matchroom Boxing,Operate,VTR\r
21/11/2026,14:00,23:30,Fil Fillin,VIC-Pullman Melbourne Albert Park,1017099 - GRAND 3-7 | WEDDING | Muy and Leroy,Operate,Lighting - GMA3\r
19/11/2026,09:30,11:00,Floyd Moratti,VIC-Crown Towers,1018292 - Garden Room | AAD 4-Year Strategy Roadshow | M,Set Up,Crewleader\r
17/11/2026,16:00,19:30,Floyd Moratti,VIC-Crown Towers,1020235 - Garden | GACM International Forum 2026,Set Up,AV Technician\r
18/11/2026,07:00,15:30,Floyd Moratti,VIC-Crown Towers,1020235 - Garden | GACM International Forum 2026,Operate,AV L2\r
17/11/2026,19:30,21:30,Floyd Moratti,VIC-Crown Towers,0998372 - Promenade 1 & 2 | Finsure & Loankit PD Day '26,Set Up,AV Technician\r
21/11/2026,06:30,15:30,Floyd Moratti,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Turnaround,AV Technician\r
17/11/2026,09:30,13:30,Floyd Moratti,VIC-Crown Towers,1000746 - Pall AB | CPA Australia Member Recognition Ceremon,Set Up,AV Technician\r
20/11/2026,14:00,17:00,Floyd Moratti,VIC-Pullman Melbourne Albert Park,1002578 - Grand 1-6 | Aquinas College Dinner 2026,Turnaround,AV Technician\r
17/11/2026,13:30,16:00,Floyd Moratti,VIC-Crown Towers,1017313 - Evergreen | Australian Corporate Games Awards Part,Set Up,AV Technician\r
19/11/2026,05:00,09:30,Floyd Moratti,VIC-Crown Towers,1017830 - River - 2026 HIA Industry Outlook Breakfast,Operate,AV L2\r
19/11/2026,11:00,12:30,Floyd Moratti,VIC-Crown Towers,1017830 - River - 2026 HIA Industry Outlook Breakfast,Pack Down,Crewleader\r
20/11/2026,06:00,08:00,Floyd Moratti,VIC-Melb Marriott Hotel Docklands,,,Audio L2\r
20/11/2026,08:00,09:30,Floyd Moratti,VIC-Melbourne Cricket Ground,0983300 - Our Lady of Sion Valedictory 2026 | Olympic,Pack Down,Audio L2\r
20/11/2026,09:30,12:00,Floyd Moratti,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Set Up,Audio L2\r
18/11/2026,15:00,23:30,Garth Hardiman,VIC-Crown Towers,0966857 - Pal | Frankston High School Valedictory Dinner '26,Operate,Camera Operator\r
17/11/2026,13:30,20:30,Garth Hardiman,VIC-Crown Towers,1000746 - Pall AB | CPA Australia Member Recognition Ceremon,Operate,Camera Operator\r
20/11/2026,15:00,23:30,George K,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Operate,Technical Director Production\r
19/11/2026,17:00,00:00,George K,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Set Up,Technical Director Production\r
16/11/2026,00:00,23:59,Georgie Rayner,VIC-Grand Hyatt Melbourne,,,RDO\r
19/11/2026,00:00,23:59,Georgie Rayner,VIC-Grand Hyatt Melbourne,,,RDO\r
22/11/2026,17:00,19:00,Georgie Rayner,VIC-Crown Towers,1005713 - HRZ | Midori Chui and Ming-Yiu Sebastian Wong Wedd,Pack Down,Crewleader\r
22/11/2026,11:00,17:00,Georgie Rayner,VIC-Crown Towers,1008061 - Prom 1 & 2 | AI.CARE Conference 2026,Turnaround,Crewleader\r
21/11/2026,15:30,00:30,Georgie Rayner,VIC-Crown Towers,0971125 - Pall | William Adams 100 Year Celebration - VIC &,Operate,Audio F/B\r
18/11/2026,11:30,16:30,Georgie Rayner,VIC-Crown Towers,1011049 - 28 | NAB Dinner,Set Up,Crewleader\r
17/11/2026,00:00,23:59,Georgie Rayner,VIC-Grand Hyatt Melbourne,,,RDO\r
18/11/2026,08:30,11:30,Georgie Rayner,VIC-Crown Towers,0966857 - Pal | Frankston High School Valedictory Dinner '26,Set Up,Crewleader\r
18/11/2026,08:00,08:30,Georgie Rayner,VIC-Crown Towers,1016624 - M7 | Delta Agribusiness Supplier Review Meeting,Rehearsal,AV Meet & Greet\r
21/11/2026,12:00,15:30,Georgie Rayner,VIC-Crown Towers,0966860 - AVIARY | Huy Tu & Belinda Duong's Wedding,Set Up,Crewleader\r
20/11/2026,12:00,00:30,Georgie Rayner,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Operate,Audio F/B\r
18/11/2026,16:30,20:00,Georgie Rayner,VIC-Crown Towers,1017463 - Horizon | HDI Global EOYC,Set Up,Crewleader\r
19/11/2026,06:00,09:00,GusDe,VIC-Hyde Melbourne Place,1015513 - Olive | FloQast,Rehearsal,Cancelled Shift - UNPAID\r
22/11/2026,11:30,17:00,GusDe,VIC-Crown Towers,0905280 - Pal AB | Vermont Secondary College Valedictory Din,Set Up,Cancelled Shift - UNPAID\r
20/11/2026,00:30,10:30,GusDe,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,AV Technician\r
16/11/2026,11:00,11:30,Haki Marshall,VIC-Hyatt Place Essendon Fields,,,Travel time\r
16/11/2026,12:00,17:00,Haki Marshall,VIC-Hyatt Place Essendon Fields,1008147 - Australian 1 2 3 Atrium | AIA,Set Up,EWP Spotter\r
16/11/2026,06:00,11:00,Haki Marshall,VIC-Events Flemington,1019501 - Northcote HS Graduation 2026 | Atrium,Turnaround,Audio L2\r
17/11/2026,14:30,17:00,Haki Marshall,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Turnaround,EWP OP\r
17/11/2026,14:00,14:30,Haki Marshall,VIC-CENTREPIECE,1021429 - GH1 | We Are Carlisle - Breakout,Pack Down,AV L1\r
20/11/2026,11:30,15:00,Haki Marshall,VIC-Melbourne Showgrounds,1021770 - Indian High Tea and Dinner | VIC PAV,Set Up,Crewleader\r
18/11/2026,00:00,23:59,Haki Marshall,VIC-Melbourne Showgrounds,,,RDO\r
17/11/2026,06:00,14:30,Haki Marshall,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Operate,Stage Hand\r
20/11/2026,10:30,11:30,Haki Marshall,VIC-Melbourne Showgrounds,1000110 - Point Cook SS College Valedictory Dinner 2026 | VI,Pack Down,Crewleader\r
20/11/2026,16:00,21:00,Haki Marshall,VIC-Hyatt Place Essendon Fields,1016288 - Australia 1 2 3 & Atrium | Coaches Congress,Set Up,AV L2\r
22/11/2026,00:00,23:59,Haki Marshall,VIC-Melbourne Showgrounds,,,RDO\r
19/11/2026,16:00,23:00,Haki Marshall,VIC-Melbourne Showgrounds,1000110 - Point Cook SS College Valedictory Dinner 2026 | VI,Operate,Audio L2\r
19/11/2026,13:00,15:30,Haki Marshall,VIC-Melbourne Showgrounds,1000110 - Point Cook SS College Valedictory Dinner 2026 | VI,Turnaround,Crewleader\r
21/11/2026,14:00,23:30,Haki Marshall,VIC-Pullman Melbourne Albert Park,1017099 - GRAND 3-7 | WEDDING | Muy and Leroy,Operate,Audio L2\r
16/11/2026,12:30,16:30,Harper Katsikas,VIC-Pullman Melbourne Albert Park,,,Venue Duties\r
16/11/2026,08:00,12:00,Harper Katsikas,VIC-Pullman Melbourne Albert Park,1020173 - GRAND | Matchroom Boxing,,VTR\r
16/11/2026,12:00,12:30,Harper Katsikas,VIC-Pullman Melbourne Albert Park,1018186 - Albert | 20Talk,Pack Down,AV Technician\r
19/11/2026,13:00,16:00,Harper Katsikas,VIC-Pullman Melbourne Albert Park,1006555 - Grand 1-6 | Mac Robertson Girls School Grad,Set Up,AV L2\r
19/11/2026,16:00,23:30,Harper Katsikas,VIC-Pullman Melbourne Albert Park,1006555 - Grand 1-6 | Mac Robertson Girls School Grad,Operate,Audio L2\r
20/11/2026,23:00,00:30,Harper Katsikas,VIC-Pullman Melbourne Albert Park,1017099 - GRAND 3-7 | WEDDING | Muy and Leroy,Turnaround,AV Technician\r
17/11/2026,10:00,14:00,Harper Katsikas,VIC-Pullman Melbourne Albert Park,1020173 - GRAND | Matchroom Boxing,Set Up,AV L2\r
17/11/2026,08:00,10:00,Harper Katsikas,VIC-Pullman Melbourne Albert Park,1022031 - X-Hire | Matchroom,Set Up,Audio L2\r
21/11/2026,00:00,23:59,Harper Katsikas,VIC-Pullman Melbourne Albert Park,,,RDO\r
22/11/2026,00:00,23:59,Harper Katsikas,VIC-Pullman Melbourne Albert Park,,,RDO\r
17/11/2026,14:00,16:00,Harper Katsikas,VIC-Pullman Melbourne Albert Park,,,Venue Duties\r
18/11/2026,07:00,14:30,Harper Katsikas,VIC-Pullman Melbourne Albert Park,1020173 - GRAND | Matchroom Boxing,Operate,Systems Tech\r
20/11/2026,17:00,23:00,Harper Katsikas,VIC-Pullman Melbourne Albert Park,1002578 - Grand 1-6 | Aquinas College Dinner 2026,Operate,AV Senior\r
20/11/2026,14:00,17:00,Harper Katsikas,VIC-Pullman Melbourne Albert Park,1002578 - Grand 1-6 | Aquinas College Dinner 2026,Turnaround,Crewleader\r
19/11/2026,15:00,16:30,Henry White,VIC-The Langham Melbourne,1010477 - Alto | Brightedge Event,Turnaround,AV Technician\r
21/11/2026,06:30,15:30,Henry White,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Turnaround,AV Technician\r
19/11/2026,17:00,00:00,Henry White,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Set Up,Audio L2\r
20/11/2026,09:00,11:30,Iain Foster,VIC-Melbourne Cricket Ground,1019305 - Celebration of Life for Ian Edney | MDR,Set Up,Crewleader\r
20/11/2026,14:30,15:30,Iain Foster,VIC-Melbourne Cricket Ground,1019305 - Celebration of Life for Ian Edney | MDR,Pack Down,Crewleader\r
22/11/2026,00:00,23:59,Iain Foster,VIC-Melbourne Cricket Ground,,,RDO\r
20/11/2026,11:30,12:30,Iain Foster,VIC-Melbourne Cricket Ground,1011221 - WOMCC AGM | Long Room,Pack Down,Crewleader\r
20/11/2026,13:00,14:00,Iain Foster,VIC-Melbourne Cricket Ground,1012231 - Men’s International T20I Series Australia V Englan,Set Up,Crewleader\r
21/11/2026,00:00,23:59,Iain Foster,VIC-Melbourne Cricket Ground,,,RDO\r
20/11/2026,14:00,14:30,Iain Foster,VIC-Melbourne Cricket Ground,1000432 - Members Health General Meeting & AHSA | Hassett,Pack Down,Crewleader\r
20/11/2026,08:00,09:00,Iain Foster,VIC-Melbourne Cricket Ground,1003375 - Mater Christi 2026 Valedictory | MDR,Pack Down,Crewleader\r
20/11/2026,15:30,16:00,Iain Foster,VIC-Melbourne Cricket Ground,1017124 - Westbourne Grammar School - 2026 Valedictory - MDR,Set Up,Crewleader\r
17/11/2026,13:00,18:00,Ian Chistopher,VIC-Base Event Delivery,1001469 - Ritz Carlton Melb | ANZ Lending Conference,Set Up,Camera Operator\r
18/11/2026,07:00,18:00,Ian Chistopher,VIC-Base Event Delivery,1001469 - Ritz Carlton Melb | ANZ Lending Conference,Operate,Camera Operator\r
17/11/2026,05:30,15:30,Innocent M,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Operate,Technical Director Production\r
17/11/2026,15:00,15:30,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1004147 - Salesian College Business Lunch | AFL Dining,Set Up,AV L1\r
17/11/2026,14:30,15:00,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1020025 - MCC Internal - BHF Community Partners Day | Dillba,Pack Down,AV L1\r
17/11/2026,18:00,20:00,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1012390 - Goodstart - Vic Conference & Dinner - Olympic,Pack Down,Crewleader\r
17/11/2026,15:30,16:00,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1016417 - MCC Permanent Staff - Elevate Training | JSG,Pack Down,AV L1\r
17/11/2026,17:30,18:00,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1021176 - MCC Event Staff Induction Night | Ryder,Pack Down,AV L1\r
16/11/2026,14:00,14:30,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1017854 - Easygo Workshop - Legends - 14 & 15 Nov 26,Pack Down,AV L1\r
16/11/2026,09:30,10:30,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1018338 - Victoria Police Legacy Christmas Lunch 2026 | MDR,Pack Down,AV L1\r
16/11/2026,10:30,13:30,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1018602 - Islamic College of Sport Graduation Dinner | MDR,Set Up,AV L1\r
16/11/2026,14:30,15:30,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1019430 - MCC Permanent Staff - Elevate Training | Legends,Set Up,AV L1\r
16/11/2026,15:30,16:30,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1019773 - Best Case Scenario | The Deck | 17.11.26,Set Up,AV L1\r
16/11/2026,08:00,09:00,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1020025 - MCC Internal - BHF Community Partners Day | Dillba,Rehearsal,AV Meet & Greet\r
18/11/2026,00:00,23:59,JP GancedoUbeda,VIC-Production,,,RDO\r
19/11/2026,00:00,23:59,JP GancedoUbeda,VIC-Production,,,RDO\r
17/11/2026,20:00,23:00,JP GancedoUbeda,VIC-Melbourne Cricket Ground,0962842 - Melbourne Immunotherapy Network | Olympic,Set Up,Crewleader\r
17/11/2026,16:00,17:30,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1000427 - Members Health General Meeting & AHSA | JSG,Set Up,Crewleader\r
17/11/2026,23:00,23:30,JP GancedoUbeda,VIC-Melbourne Cricket Ground,1019292 - Richmond Football Club Foundation Dinner | CR,Pack Down,Crewleader\r
16/11/2026,00:30,23:59,Jack Matotek,VIC-Crown Towers,0 - Non Event Shift (unbillable),,RDO\r
17/11/2026,12:30,20:30,Jack Matotek,VIC-Crown Towers,1000746 - Pall AB | CPA Australia Member Recognition Ceremon,Operate,Sick\r
21/11/2026,17:00,18:00,Jack Matotek,VIC-Crown Towers,1005713 - HRZ | Midori Chui and Ming-Yiu Sebastian Wong Wedd,Rehearsal,AV Meet & Greet\r
18/11/2026,13:30,15:00,Jack Matotek,VIC-Crown Towers,0966857 - Pal | Frankston High School Valedictory Dinner '26,Operate,Lighting Pinspot Prog\r
19/11/2026,16:00,17:00,Jack Matotek,VIC-Crown Towers,0966858 - Pal | Padua College Year 12 Valedictory Di,Operate,Lighting Pinspot Prog\r
18/11/2026,15:00,23:30,Jack Matotek,VIC-Crown Towers,0966857 - Pal | Frankston High School Valedictory Dinner '26,Operate,Lighting L2\r
19/11/2026,13:00,16:00,Jack Matotek,VIC-Crown Towers,0966858 - Pal | Padua College Year 12 Valedictory Di,Set Up,Lighting L2\r
20/11/2026,12:00,00:30,Jack Matotek,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Operate,Lighting L2\r
20/11/2026,12:00,13:00,Jack Matotek,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Operate,Lighting Pinspot Prog\r
22/11/2026,00:30,23:59,Jack Matotek,VIC-Crown Towers,0 - Non Event Shift (unbillable),,RDO\r
21/11/2026,11:00,19:00,Jack Matotek,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Technical Director Venues\r
19/11/2026,17:00,23:15,Jack Matotek,VIC-Crown Towers,0966858 - Pal | Padua College Year 12 Valedictory Di,Operate,Lighting L2\r
16/11/2026,00:00,23:59,Jacob Leighton,VIC-Crown Towers,0 - Non Event Shift (unbillable),,RDO\r
17/11/2026,10:00,12:30,Jacob Leighton,VIC-Crown Towers,1000746 - Pall AB | CPA Australia Member Recognition Ceremon,Set Up,AV Technician\r
17/11/2026,12:30,20:30,Jacob Leighton,VIC-Crown Towers,1000746 - Pall AB | CPA Australia Member Recognition Ceremon,Operate,Lighting L2\r
18/11/2026,08:30,12:00,Jacob Leighton,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Technician On Duty\r
22/11/2026,11:30,17:00,Jacob Leighton,VIC-Crown Towers,1008061 - Prom 1 & 2 | AI.CARE Conference 2026,Turnaround,EWP OP\r
22/11/2026,17:00,19:30,Jacob Leighton,VIC-Crown Towers,1008068 - Prom 3 | AI.Care Conference 2026,Set Up,Crewleader\r
18/11/2026,12:30,15:30,Jacob Leighton,VIC-CENTREPIECE,1015909 - Auditorium | DJSIR End-of-Year Event,Set Up,DES vMix Operator\r
18/11/2026,18:00,19:00,Jacob Leighton,VIC-CENTREPIECE,1015909 - Auditorium | DJSIR End-of-Year Event,Rehearsal,AV Technician\r
18/11/2026,15:30,17:30,Jacob Leighton,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Operate,AV Technician\r
18/11/2026,08:00,08:30,Jacob Leighton,VIC-Crown Towers,1017067 - M10 | Nufarm NOV Meeting,Operate,AV Meet & Greet\r
21/11/2026,06:00,15:30,Jacob Leighton,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Turnaround,Crewleader\r
19/11/2026,07:30,11:30,Jacob Leighton,VIC-CENTREPIECE,1015909 - Auditorium | DJSIR End-of-Year Event,Operate,AV L2\r
19/11/2026,12:00,14:00,Jacob Leighton,VIC-CENTREPIECE,1015909 - Auditorium | DJSIR End-of-Year Event,Pack Down,Crewleader\r
20/11/2026,00:00,23:59,Jacob Leighton,VIC-Crown Towers,0 - Non Event Shift (unbillable),,RDO\r
18/11/2026,10:30,13:30,Jade Telford,VIC-Crown Towers,1004912 - Evergreen | Kubota CE Launch Dinner 2026,Set Up,AV Technician\r
19/11/2026,14:00,16:00,Jade Telford,VIC-Melbourne Cricket Ground,1018316 - Metro Senior Leadership Forum | MDR,Pack Down,AV L1\r
19/11/2026,16:00,16:30,Jade Telford,VIC-Melbourne Cricket Ground,0962842 - Melbourne Immunotherapy Network | Olympic,Pack Down,AV L1\r
19/11/2026,16:30,18:00,Jade Telford,VIC-Melbourne Cricket Ground,0983300 - Our Lady of Sion Valedictory 2026 | Olympic,Set Up,AV L1\r
18/11/2026,07:30,10:30,Jade Telford,VIC-Crown Towers,1017900 - Horizon | Tim Donohue Client Farewell Lunch,Set Up,AV Technician\r
20/11/2026,12:00,15:30,Jared Christoph,VIC-Melbourne Cricket Ground,1019305 - Celebration of Life for Ian Edney | MDR,Operate,Camera Operator\r
19/11/2026,17:00,23:15,Jared Christoph,VIC-Crown Towers,1010787 - Additions | Padua College,Operate,Camera Operator\r
17/11/2026,05:30,15:00,Jared Christoph,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Operate,Camera Operator\r
20/11/2026,16:00,23:00,Jared Christoph,VIC-Melbourne Cricket Ground,1017124 - Westbourne Grammar School - 2026 Valedictory - MDR,Operate,Camera Operator\r
16/11/2026,00:00,23:59,Jason Hart,VIC-Melbourne Cricket Ground,,,RDO\r
22/11/2026,00:00,23:59,Jason Hart,VIC-Melbourne Cricket Ground,,,RDO\r
21/11/2026,14:30,23:00,Jason Hart,VIC-Melbourne Cricket Ground,1021020 - MCC | 2026 | T20 - Match Day Tech,,Match Day Tech\r
18/11/2026,22:30,00:00,Jason Hart,VIC-Melbourne Cricket Ground,0962842 - Melbourne Immunotherapy Network | Olympic,Operate,Crewleader\r
21/11/2026,23:00,00:00,Jason Hart,VIC-Melbourne Cricket Ground,1021256 - 1956 Olympics Pre-Event | Betty Cuthbert Bar,Set Up,AV L1\r
17/11/2026,09:00,16:36,Jason Hart,VIC-Melbourne Cricket Ground,,,Sick\r
18/11/2026,16:00,22:30,Jason Hart,VIC-Melbourne Cricket Ground,0962842 - Melbourne Immunotherapy Network | Olympic,Operate,AV L2\r
19/11/2026,15:00,16:30,Jason Hart,VIC-Melbourne Cricket Ground,0962842 - Melbourne Immunotherapy Network | Olympic,Pack Down,Crewleader\r
19/11/2026,16:30,18:00,Jason Hart,VIC-Melbourne Cricket Ground,0983300 - Our Lady of Sion Valedictory 2026 | Olympic,Set Up,Crewleader\r
19/11/2026,18:00,23:30,Jason Hart,VIC-Melbourne Cricket Ground,0983300 - Our Lady of Sion Valedictory 2026 | Olympic,Operate,AV L2\r
20/11/2026,16:00,23:00,Jason Hart,VIC-Melbourne Cricket Ground,1017124 - Westbourne Grammar School - 2026 Valedictory - MDR,Operate,AV L2\r
21/11/2026,14:00,14:30,Jason Hart,VIC-Melbourne Cricket Ground,,,AV Meet & Greet\r
16/11/2026,06:30,15:30,JasonMarkoutsas,VIC-Crown Towers,1019415 - CCH1 | CBN - CD Days,Operate,AV L2\r
18/11/2026,10:30,11:00,JasonMarkoutsas,VIC-The Langham Melbourne,,,AV Technician\r
18/11/2026,09:00,09:30,JasonMarkoutsas,VIC-The Langham Melbourne,0976073 - Flinders | Renaissance Tours - Day 2,Rehearsal,AV Meet & Greet\r
18/11/2026,12:00,14:30,JasonMarkoutsas,VIC-The Langham Melbourne,1010477 - Alto | Brightedge Event,Turnaround,AV Technician\r
20/11/2026,08:30,09:00,JasonMarkoutsas,VIC-Crown Towers,1010290 - Prom 1 - Engie Team Building Day,Rehearsal,AV Meet & Greet\r
20/11/2026,09:00,16:30,JasonMarkoutsas,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Prep\r
18/11/2026,08:30,09:00,JasonMarkoutsas,VIC-The Langham Melbourne,0976056 - Flinders | Renaissance Tours - Day 1,Turnaround,AV Meet & Greet\r
19/11/2026,06:30,16:30,JasonMarkoutsas,VIC-Melbourne Cricket Ground,0962842 - Melbourne Immunotherapy Network | Olympic,Operate,AV L2\r
17/11/2026,09:00,12:00,JasonMarkoutsas,VIC-The Langham Melbourne,0967042 - Ballroom - Department of Neurosurgery,Set Up,AV L2\r
18/11/2026,09:30,10:30,JasonMarkoutsas,VIC-The Langham Melbourne,0997807 - Swanston | Real Estate Dynamics Event,Set Up,AV Technician\r
17/11/2026,09:30,13:30,Jayden Whitelaw,VIC-Crown Towers,1000746 - Pall AB | CPA Australia Member Recognition Ceremon,Set Up,Sick\r
18/11/2026,13:30,17:00,Jayden Whitelaw,VIC-Crown Towers,1005319 - River | ANZ Proprietary Lending - Remote Awards Ni,Set Up,Lighting L2\r
18/11/2026,17:00,18:00,Jayden Whitelaw,VIC-Crown Towers,1005319 - River | ANZ Proprietary Lending - Remote Awards Ni,Rehearsal,Lighting L2\r
18/11/2026,18:00,23:00,Jayden Whitelaw,VIC-Crown Towers,1005319 - River | ANZ Proprietary Lending - Remote Awards Ni,Operate,Lighting L2\r
19/11/2026,00:00,23:59,Jayden Whitelaw,VIC-Crown Towers,,,RDO\r
16/11/2026,06:30,15:30,Jayden Whitelaw,VIC-Crown Towers,1019415 - CCH1 | CBN - CD Days,Operate,Sick\r
17/11/2026,13:30,16:00,Jayden Whitelaw,VIC-Crown Towers,1017313 - Evergreen | Australian Corporate Games Awards Part,Set Up,Sick\r
17/11/2026,16:00,19:30,Jayden Whitelaw,VIC-Crown Towers,1020235 - Garden | GACM International Forum 2026,Set Up,Sick\r
20/11/2026,00:30,10:30,Jayden Whitelaw,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,Lighting L2\r
21/11/2026,00:00,23:59,Jayden Whitelaw,VIC-Crown Towers,,,RDO\r
17/11/2026,19:30,21:30,Jayden Whitelaw,VIC-Crown Towers,0998372 - Promenade 1 & 2 | Finsure & Loankit PD Day '26,Set Up,Sick\r
22/11/2026,11:30,17:00,Jayden Whitelaw,VIC-Crown Towers,0905280 - Pal AB | Vermont Secondary College Valedictory Din,Set Up,Lighting L2\r
22/11/2026,11:30,17:00,Jean Hooker,VIC-Crown Towers,1008061 - Prom 1 & 2 | AI.CARE Conference 2026,Turnaround,AV Technician\r
18/11/2026,16:00,21:30,Jean Hooker,VIC-Events Flemington,1019501 - Northcote HS Graduation 2026 | Atrium,Operate,Audio FOH\r
18/11/2026,21:30,23:00,Jean Hooker,VIC-Events Flemington,1019501 - Northcote HS Graduation 2026 | Atrium,Pack Down,AV Technician\r
20/11/2026,14:00,17:00,Jean Hooker,VIC-Pullman Melbourne Albert Park,1002578 - Grand 1-6 | Aquinas College Dinner 2026,Turnaround,AV L2\r
20/11/2026,17:00,18:00,Jean Hooker,VIC-Pullman Melbourne Albert Park,1004857 - VICTORIA | USANZ Trainee Week 2026,Set Up,AV Technician\r
19/11/2026,15:00,16:30,Jeremie Defoix,VIC-The Langham Melbourne,1010477 - Alto | Brightedge Event,Turnaround,AV Technician\r
17/11/2026,08:00,10:00,Jeremie Defoix,VIC-1 Hotel Melbourne,,,AV Meet & Greet\r
16/11/2026,08:00,11:00,Jeremie Defoix,VIC-1 Hotel Melbourne,1017148 - Set | Lighthouse Foundation,Set Up,Crewleader\r
16/11/2026,11:30,12:00,Jeremie Defoix,VIC-1 Hotel Melbourne,1017301 - Saltbush & Bracken | KPMG,Rehearsal,AV Meet & Greet\r
18/11/2026,12:00,16:00,Jeremie Defoix,VIC-1 Hotel Melbourne,1013924 - Seafarers Set | Deakin Chancellor's Dinner,Set Up,Crewleader\r
18/11/2026,16:00,22:30,Jeremie Defoix,VIC-1 Hotel Melbourne,1013924 - Seafarers Set | Deakin Chancellor's Dinner,Operate,AV L2\r
17/11/2026,06:30,07:00,Jeremie Defoix,VIC-1 Hotel Melbourne,1015441 - Rivergrass | Volvo Comparison Meeting,Set Up,AV Technician\r
17/11/2026,07:00,08:00,Jeremie Defoix,VIC-1 Hotel Melbourne,1015441 - Rivergrass | Volvo Comparison Meeting,Rehearsal,AV Meet & Greet\r
17/11/2026,10:00,15:00,Jeremie Defoix,VIC-1 Hotel Melbourne,1017148 - Set | Lighthouse Foundation,Operate,AV L2\r
20/11/2026,15:00,23:30,Jeremie Defoix,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Operate,Audio FOH\r
21/11/2026,00:00,23:59,Jeremie Defoix,VIC-1 Hotel Melbourne,,,RDO\r
22/11/2026,00:00,23:59,Jeremie Defoix,VIC-1 Hotel Melbourne,,,RDO\r
19/11/2026,17:00,00:00,Jeremie Defoix,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Set Up,Crewleader\r
20/11/2026,12:00,15:00,Jeremie Defoix,VIC-1 Hotel Melbourne,1003305 - Band Rider EMPIRE,Set Up,Audio FOH\r
18/11/2026,17:00,19:00,Jesse Muratore,VIC-Base Event Delivery,1001469 - Ritz Carlton Melb | ANZ Lending Conference,Load Return,Driver Van\r
16/11/2026,09:00,11:30,Jesse Muratore,VIC-AC Hotel By Marriott Melb SB,,,Transfer\r
16/11/2026,07:00,09:00,Jesse Muratore,VIC-Events Flemington,1012994 - MP Staff Charity Ball | Atrium,Load Return,Driver Van\r
20/11/2026,06:00,09:00,Jesse Muratore,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),,Driver MR\r
19/11/2026,08:00,16:00,Jesse Muratore,VIC-Warehouse And Ops,,,Warehouse\r
19/11/2026,06:00,09:00,Jesse Muratore,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),Start at Base,Driver MR\r
17/11/2026,08:00,16:00,Jesse Muratore,VIC-Warehouse And Ops,,,Warehouse\r
18/11/2026,12:00,16:30,Jesse Muratore,VIC-Warehouse And Ops,,,Warehouse\r
20/11/2026,08:00,16:00,Jesse Muratore,VIC-Warehouse And Ops,,,Warehouse\r
19/11/2026,17:00,19:00,Jesse Muratore,VIC-Hilton Melb Little Queen St,,,Driver Van\r
16/11/2026,11:00,15:00,Jet Winter,VIC-Hyatt Place Essendon Fields,0 - Non Event Shift (unbillable),,Rigger Intermediate\r
17/11/2026,10:30,14:00,Jet Winter,VIC-Pullman Melbourne Albert Park,1020188 - RIGGING | Matchroom Boxing,Set Up,Rigging Assist\r
19/11/2026,08:00,12:00,Jet Winter,VIC-Pullman Melbourne Albert Park,1020188 - RIGGING | Matchroom Boxing,Pack Down,Rigging Assist\r
20/11/2026,08:30,15:00,Jimmy M,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),,Transfer - R2\r
20/11/2026,11:30,12:00,Jimmy M,VIC-CENTREPIECE,1021446 - SABB | Mic Hire - 21-11-26,Set Up,AV Technician\r
19/11/2026,13:00,16:00,Jimmy Pucci,VIC-Pullman Melbourne Albert Park,1006555 - Grand 1-6 | Mac Robertson Girls School Grad,Set Up,AV Technician\r
16/11/2026,08:00,14:00,Joe T,VIC-Warehouse And Ops,,,Warehouse\r
16/11/2026,06:00,16:30,Jonty Griffin,VIC-Crown Towers,1020726 - River 1 | CML Committee Meeting,Operate,DES - L2 Digital Event Tech\r
19/11/2026,17:00,23:30,Jonty Griffin,VIC-Crown Towers,1010787 - Additions | Padua College,Operate,Vision L2\r
17/11/2026,00:00,23:59,Jonty Griffin,VIC-Crown Towers,,,RDO\r
18/11/2026,14:00,23:30,Jonty Griffin,VIC-Crown Towers,0966857 - Pal | Frankston High School Valedictory Dinner '26,Operate,Vision L2\r
20/11/2026,12:00,00:30,Jonty Griffin,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Operate,VX - E2 - Advanced\r
21/11/2026,00:00,23:59,Jonty Griffin,VIC-Crown Towers,,,RDO\r
22/11/2026,00:00,23:59,Jonty Griffin,VIC-Crown Towers,,,RDO\r
19/11/2026,13:00,17:00,Jonty Griffin,VIC-Crown Towers,0966858 - Pal | Padua College Year 12 Valedictory Di,Set Up,Crewleader\r
19/11/2026,05:00,08:00,Joe Connolly,VIC-1 Hotel Melbourne,1008804 - Seafarers | LFRA Forum,Set Up,Crewleader\r
19/11/2026,08:00,15:00,Joe Connolly,VIC-1 Hotel Melbourne,1008804 - Seafarers | LFRA Forum,Operate,Audio L2\r
18/11/2026,11:00,12:00,Joe Connolly,VIC-Westin Melbourne,1020830 - Executive II | Ridley AGM,Pack Down,Audio L1\r
17/11/2026,00:00,23:59,Joe Connolly,VIC-1 Hotel Melbourne,,,RDO\r
18/11/2026,12:30,16:00,Joe Connolly,VIC-1 Hotel Melbourne,,,Venue Duties\r
18/11/2026,13:00,13:30,Joe Connolly,VIC-1 Hotel Melbourne,,,Internal Meeting\r
16/11/2026,08:00,11:00,Joe Connolly,VIC-1 Hotel Melbourne,1017148 - Set | Lighthouse Foundation,Set Up,AV L2\r
20/11/2026,15:00,23:30,Joe Connolly,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Operate,Audio L2\r
22/11/2026,00:00,23:59,Joe Connolly,VIC-1 Hotel Melbourne,,,RDO\r
18/11/2026,06:30,09:00,Joe Connolly,VIC-Westin Melbourne,1020830 - Executive II | Ridley AGM,Rehearsal,Audio L1\r
18/11/2026,10:00,11:00,Joe Connolly,VIC-Westin Melbourne,1020830 - Executive II | Ridley AGM,Operate,Audio L1\r
20/11/2026,12:00,15:00,Joe Connolly,VIC-1 Hotel Melbourne,1003305 - Band Rider EMPIRE,Set Up,Audio L2\r
21/11/2026,11:00,11:30,Joe Connolly,VIC-The Langham Melbourne,1003972 - Alto - Wedding of Angela & Ryan,Rehearsal,AV Meet & Greet\r
21/11/2026,10:00,11:00,Joe Connolly,VIC-The Langham Melbourne,1003972 - Alto - Wedding of Angela & Ryan,Turnaround,AV Technician\r
21/11/2026,12:30,18:30,Joe Connolly,VIC-1 Hotel Melbourne,1017025 - Set | NAB Platinum Awards,Set Up,Crewleader\r
16/11/2026,13:30,14:00,Josh Lee,VIC-Melbourne Cricket Ground,1019902 - MCC Internal - BHF Community Partners Day | Jameso,,AV Meet & Greet\r
16/11/2026,09:00,09:30,Josh Lee,VIC-Melbourne Cricket Ground,1019902 - MCC Internal - BHF Community Partners Day | Jameso,,AV L1\r
16/11/2026,14:00,14:30,Josh Lee,VIC-Melbourne Cricket Ground,1017854 - Easygo Workshop - Legends - 14 & 15 Nov 26,Pack Down,Crewleader\r
18/11/2026,11:30,12:00,Josh Lee,VIC-Melbourne Cricket Ground,1000427 - Members Health General Meeting & AHSA | JSG,Rehearsal,AV Meet & Greet\r
17/11/2026,14:30,15:00,Josh Lee,VIC-Melbourne Cricket Ground,1000432 - Members Health General Meeting & AHSA | Hassett,Set Up,AV L1\r
18/11/2026,09:30,10:00,Josh Lee,VIC-Melbourne Cricket Ground,1000432 - Members Health General Meeting & AHSA | Hassett,Rehearsal,AV Meet & Greet\r
18/11/2026,16:00,17:00,Josh Lee,VIC-Melbourne Cricket Ground,1000440 - Members Health General Meeting & AHSA | Committee,Set Up,AV L1\r
18/11/2026,17:30,18:30,Josh Lee,VIC-Melbourne Cricket Ground,1000440 - Members Health General Meeting & AHSA | Committee,Rehearsal,AV Meet & Greet\r
19/11/2026,08:00,08:30,Josh Lee,VIC-Melbourne Cricket Ground,1000440 - Members Health General Meeting & AHSA | Committee,Pack Down,AV L1\r
19/11/2026,13:00,13:30,Josh Lee,VIC-Melbourne Cricket Ground,1000443 - Members Health General Meeting & AHSA | Ryder,Rehearsal,AV Meet & Greet\r
19/11/2026,16:00,17:30,Josh Lee,VIC-Melbourne Cricket Ground,1003375 - Mater Christi 2026 Valedictory | MDR,Set Up,AV L1\r
19/11/2026,17:30,19:00,Josh Lee,VIC-Melbourne Cricket Ground,1003375 - Mater Christi 2026 Valedictory | MDR,Rehearsal,AV Meet & Greet\r
19/11/2026,11:30,12:00,Josh Lee,VIC-Melbourne Cricket Ground,1004147 - Salesian College Business Lunch | AFL Dining,Rehearsal,AV Meet & Greet\r
17/11/2026,12:30,13:00,Josh Lee,VIC-Melbourne Cricket Ground,1011221 - WOMCC AGM | Long Room,Set Up,AV L1\r
18/11/2026,17:00,17:30,Josh Lee,VIC-Melbourne Cricket Ground,1011221 - WOMCC AGM | Long Room,Rehearsal,AV Meet & Greet\r
18/11/2026,10:30,11:30,Josh Lee,VIC-Melbourne Cricket Ground,0 - Non Event Shift (unbillable),,Onsite Tech\r
19/11/2026,09:30,11:30,Josh Lee,VIC-Melbourne Cricket Ground,0 - Non Event Shift (unbillable),,Onsite Tech\r
17/11/2026,17:00,18:00,Josh Lee,VIC-Melbourne Cricket Ground,1019773 - Best Case Scenario | The Deck | 17.11.26,Rehearsal,AV Meet & Greet\r
20/11/2026,09:30,10:00,Josh Lee,VIC-Melbourne Cricket Ground,1018326 - AMC 2026 Networking | JSG,Set Up,AV L1\r
16/11/2026,09:30,10:30,Josh Lee,VIC-Melbourne Cricket Ground,1018338 - Victoria Police Legacy Christmas Lunch 2026 | MDR,Pack Down,Crewleader\r
16/11/2026,10:30,13:30,Josh Lee,VIC-Melbourne Cricket Ground,1018602 - Islamic College of Sport Graduation Dinner | MDR,Set Up,Crewleader\r
16/11/2026,14:30,15:30,Josh Lee,VIC-Melbourne Cricket Ground,1019430 - MCC Permanent Staff - Elevate Training | Legends,Set Up,Crewleader\r
16/11/2026,15:30,16:30,Josh Lee,VIC-Melbourne Cricket Ground,1019773 - Best Case Scenario | The Deck | 17.11.26,Set Up,Crewleader\r
17/11/2026,09:00,09:30,Josh Lee,VIC-Melbourne Cricket Ground,1016417 - MCC Permanent Staff - Elevate Training | JSG,Rehearsal,AV Meet & Greet\r
21/11/2026,00:00,23:59,Josh Lee,VIC-Melbourne Cricket Ground,,,RDO\r
22/11/2026,00:00,23:59,Josh Lee,VIC-Melbourne Cricket Ground,,,RDO\r
17/11/2026,13:00,13:30,Josh Lee,VIC-Melbourne Cricket Ground,1021176 - MCC Event Staff Induction Night | Ryder,Rehearsal,AV Meet & Greet\r
17/11/2026,17:30,17:45,Josh Lee,VIC-Melbourne Cricket Ground,1021176 - MCC Event Staff Induction Night | Ryder,Pack Down,Crewleader\r
20/11/2026,16:30,17:30,Josh Lee,VIC-Melbourne Cricket Ground,1012781 - Men's International T20I Aus Vs Eng | Ryder,Set Up,Crewleader\r
18/11/2026,10:00,10:30,Josh Lee,VIC-Melbourne Cricket Ground,1019902 - MCC Internal - BHF Community Partners Day | Jameso,,AV L1\r
18/11/2026,13:00,16:00,Josh Lee,VIC-Melbourne Cricket Ground,1019773 - Best Case Scenario | The Deck | 17.11.26,,AV L1\r
17/11/2026,14:00,14:30,Josh Lee,VIC-Melbourne Cricket Ground,0963222 - AATC Workshop - Day 1 Hasset,Pack Down,AV L1\r
17/11/2026,09:30,10:30,Josh Lee,VIC-Melbourne Cricket Ground,1018316 - Metro Senior Leadership Forum | MDR,Set Up,Crewleader\r
19/11/2026,14:00,16:00,Josh Lee,VIC-Melbourne Cricket Ground,1018316 - Metro Senior Leadership Forum | MDR,Pack Down,AV L1\r
18/11/2026,12:30,13:00,Josh Lee,VIC-Melbourne Cricket Ground,1018598 - MCC Bridge CLub - Hans,Set Up,AV L1\r
20/11/2026,08:00,09:30,Josh Lee,VIC-Melbourne Cricket Ground,1000427 - Members Health General Meeting & AHSA | JSG,Pack Down,Crewleader\r
19/11/2026,13:00,13:30,Josh Lee,VIC-Melbourne Cricket Ground,1000432 - Members Health General Meeting & AHSA | Hassett,Rehearsal,AV Meet & Greet\r
18/11/2026,08:30,09:00,Josh Lee,VIC-Melbourne Cricket Ground,1000443 - Members Health General Meeting & AHSA | Ryder,Rehearsal,AV Meet & Greet\r
17/11/2026,08:00,09:00,Josh Lee,VIC-Melbourne Cricket Ground,1018602 - Islamic College of Sport Graduation Dinner | MDR,Pack Down,Crewleader\r
17/11/2026,11:30,12:30,Josh Lee,VIC-Melbourne Cricket Ground,1019041 - MCC Netball Presentation Dinner | Long Room,Pack Down,AV L1\r
17/11/2026,15:30,16:00,Josh Lee,VIC-Melbourne Cricket Ground,1019292 - Richmond Football Club Foundation Dinner | CR,Set Up,AV L1\r
19/11/2026,08:30,09:30,Josh Lee,VIC-Melbourne Cricket Ground,1019430 - MCC Permanent Staff - Elevate Training | Legends,Pack Down,AV L1\r
20/11/2026,15:30,16:30,Josh Lee,VIC-Melbourne Cricket Ground,1000443 - Members Health General Meeting & AHSA | Ryder,Pack Down,Crewleader\r
20/11/2026,10:00,11:30,Josh Lee,VIC-Melbourne Cricket Ground,,,Crewleader\r
16/11/2026,18:30,00:00,Joshua McBeath,VIC-Crown Towers,0973429 - CCH 1&2 | OT  ICS & SCADA Automation Conference,Set Up,Audio L2\r
16/11/2026,13:30,16:00,Joshua McBeath,VIC-Crown Towers,1015344 - Garden Room 2&3 | Iron Mountain Meeting,Set Up,AV Technician\r
16/11/2026,16:00,18:30,Joshua McBeath,VIC-Crown Towers,1020059 - River 1 | AICC Boardroom - November 2026,Set Up,AV Technician\r
16/11/2026,23:59,00:30,Joshua McBeath,VIC-Crown Towers,1021290 - CCH foyer | Exhibitor Stand 16 | OT  ICS&SCADA Aut,Set Up,AV Technician\r
19/11/2026,17:00,00:00,Joshua McBeath,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Set Up,Vision L2\r
20/11/2026,15:00,23:30,Joshua McBeath,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Operate,Vision L2\r
21/11/2026,10:45,11:15,Joshua McBeath,VIC-Melbourne Marriott Hotel,1015369 - Exhibition | Guiding Growing Minds Parenting Works,Set Up,AV L1\r
21/11/2026,11:15,12:15,Joshua McBeath,VIC-Melbourne Marriott Hotel,1015369 - Exhibition | Guiding Growing Minds Parenting Works,Rehearsal,AV L1\r
17/11/2026,00:30,23:59,Joshua McBeath,VIC-Production,,,RDO\r
18/11/2026,00:00,23:59,Joshua McBeath,VIC-Production,,,RDO\r
22/11/2026,06:30,17:30,Joshua McBeath,VIC-Pullman Melbourne Albert Park,1004868 - LAKE 1-2 | USANZ Trainee Week 2026,Operate,AV L2\r
21/11/2026,12:30,18:30,Joshua McBeath,VIC-1 Hotel Melbourne,1017025 - Set | NAB Platinum Awards,Set Up,Vision L2\r
19/11/2026,15:00,16:30,Joshua McBeath,VIC-The Langham Melbourne,1010477 - Alto | Brightedge Event,Turnaround,AV Technician\r
18/11/2026,10:00,11:00,Julie C,VIC-Westin Melbourne,1011280 - Westin III | Slipstream Group,Set Up,AV Technician\r
18/11/2026,11:00,12:00,Julie C,VIC-Westin Melbourne,1004158 - Wine Room | World Vision Australia,Set Up,AV Technician\r
18/11/2026,08:00,09:00,Julie C,VIC-Westin Melbourne,1019113 - Westin IV | Patek Philippe,Set Up,AV Technician\r
19/11/2026,10:00,11:00,Lachlan Jones,VIC-Base Event Delivery,1018398 - Kooyong Tennis Club | AV Installs Temp Hire,Rehearsal,AV Meet & Greet\r
20/11/2026,11:00,12:00,Lachlan Jones,VIC-Base Event Delivery,1018398 - Kooyong Tennis Club | AV Installs Temp Hire,Rehearsal,AV Meet & Greet\r
16/11/2026,10:30,11:30,Lachlan Jones,VIC-Base Event Delivery,1018398 - Kooyong Tennis Club | AV Installs Temp Hire,Set Up,AV Technician\r
16/11/2026,11:30,12:00,Lachlan Jones,VIC-Base Event Delivery,1018398 - Kooyong Tennis Club | AV Installs Temp Hire,Rehearsal,AV Meet & Greet\r
17/11/2026,11:00,12:00,Lachlan Jones,VIC-Base Event Delivery,1018398 - Kooyong Tennis Club | AV Installs Temp Hire,Pack Down,Cancelled Shift - UNPAID\r
20/11/2026,00:30,10:30,Lachlan Jones,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,AV Technician\r
16/11/2026,00:00,23:59,Lachy Castricum,VIC-Production,0 - Non Event Shift (unbillable),,RDO\r
19/11/2026,05:00,08:00,Lachy Castricum,VIC-1 Hotel Melbourne,1008804 - Seafarers | LFRA Forum,Set Up,Vision L2\r
19/11/2026,08:00,15:00,Lachy Castricum,VIC-1 Hotel Melbourne,1008804 - Seafarers | LFRA Forum,Operate,Vision L2\r
21/11/2026,00:00,23:59,Lachy Castricum,VIC-Production,0 - Non Event Shift (unbillable),,RDO\r
22/11/2026,00:00,23:59,Lachy Castricum,VIC-Production,0 - Non Event Shift (unbillable),,RDO\r
18/11/2026,07:00,15:30,Lachy Castricum,VIC-Crown Towers,1020235 - Garden | GACM International Forum 2026,Operate,DES - L2 Digital Event Tech\r
20/11/2026,16:30,17:30,Lachy Castricum,VIC-Melbourne Cricket Ground,1012781 - Men's International T20I Aus Vs Eng | Ryder,Set Up,AV L2\r
17/11/2026,00:00,23:59,Lachy Castricum,VIC-Production,0 - Non Event Shift (unbillable),,RDO\r
20/11/2026,08:00,10:00,Lachy Castricum,VIC-Melbourne Cricket Ground,1000427 - Members Health General Meeting & AHSA | JSG,Pack Down,AV L2\r
20/11/2026,15:30,16:30,Lachy Castricum,VIC-Melbourne Cricket Ground,1000443 - Members Health General Meeting & AHSA | Ryder,Pack Down,AV L2\r
20/11/2026,10:00,11:30,Lachy Castricum,VIC-Melbourne Cricket Ground,,,AV L2\r
19/11/2026,16:00,17:30,Liam Olsen,VIC-Crown Towers,1016510 - CCH | Community Collective Event,Set Up,AV Technician\r
19/11/2026,12:00,16:00,Liam Olsen,VIC-Crown Towers,1017952 - RIVER 2&3 | Switch Property Meeting,Set Up,AV Technician\r
19/11/2026,09:30,11:00,Liam Olsen,VIC-Crown Towers,1018292 - Garden Room | AAD 4-Year Strategy Roadshow | M,Set Up,AV Technician\r
19/11/2026,17:30,22:00,Liam Olsen,VIC-Crown Towers,1011049 - 28 | NAB Dinner,Pack Down,AV Technician\r
20/11/2026,16:00,21:00,Liam Sanders,VIC-Hyatt Place Essendon Fields,1016288 - Australia 1 2 3 & Atrium | Coaches Congress,Set Up,AV L2\r
20/11/2026,12:00,15:30,Liam Sanders,VIC-Melbourne Showgrounds,1021770 - Indian High Tea and Dinner | VIC PAV,Set Up,AV Technician\r
19/11/2026,16:00,23:00,Liam Sanders,VIC-Melbourne Showgrounds,1000110 - Point Cook SS College Valedictory Dinner 2026 | VI,Operate,Vision L2\r
19/11/2026,13:00,15:30,Liam Sanders,VIC-Melbourne Showgrounds,1000110 - Point Cook SS College Valedictory Dinner 2026 | VI,Turnaround,AV Technician\r
18/11/2026,16:00,23:30,Liam Sanders,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Operate,Vision L2\r
16/11/2026,14:00,14:30,Lin Kronlund,VIC-Melbourne Cricket Ground,1017854 - Easygo Workshop - Legends - 14 & 15 Nov 26,Pack Down,AV L2\r
16/11/2026,09:30,10:30,Lin Kronlund,VIC-Melbourne Cricket Ground,1018338 - Victoria Police Legacy Christmas Lunch 2026 | MDR,Pack Down,AV L2\r
16/11/2026,10:30,13:30,Lin Kronlund,VIC-Melbourne Cricket Ground,1018602 - Islamic College of Sport Graduation Dinner | MDR,Set Up,AV L2\r
16/11/2026,14:30,15:30,Lin Kronlund,VIC-Melbourne Cricket Ground,1019430 - MCC Permanent Staff - Elevate Training | Legends,Set Up,AV L2\r
16/11/2026,15:30,16:30,Lin Kronlund,VIC-Melbourne Cricket Ground,1019773 - Best Case Scenario | The Deck | 17.11.26,Set Up,AV L2\r
20/11/2026,15:00,23:30,Lin Kronlund,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Operate,Follow Spot Operator\r
21/11/2026,06:30,15:30,Lin Kronlund,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Turnaround,AV Technician\r
18/11/2026,16:00,23:30,Lin Kronlund,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Operate,Lighting - GMA3\r
19/11/2026,06:00,09:00,Loretta Costa,VIC-Hyde Melbourne Place,1015513 - Olive | FloQast,Rehearsal,Cancelled Shift - UNPAID\r
18/11/2026,17:00,19:00,Louis T,VIC-Base Event Delivery,1001469 - Ritz Carlton Melb | ANZ Lending Conference,Load Return,Loader\r
20/11/2026,12:30,14:00,Louis T,VIC-Crown Towers,1004912 - Evergreen | Kubota CE Launch Dinner 2026,Pack Down,AV Technician\r
18/11/2026,21:30,23:00,Louis T,VIC-Events Flemington,1019501 - Northcote HS Graduation 2026 | Atrium,Pack Down,AV Technician\r
19/11/2026,17:30,22:00,Louis T,VIC-Crown Towers,1011049 - 28 | NAB Dinner,Pack Down,AV Technician\r
22/11/2026,11:30,17:00,Louis T,VIC-Crown Towers,0905280 - Pal AB | Vermont Secondary College Valedictory Din,Set Up,AV Technician\r
21/11/2026,06:30,15:30,Louis T,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Turnaround,AV Technician\r
22/11/2026,17:00,19:00,Lucas Ferreira,VIC-Crown Towers,1005713 - HRZ | Midori Chui and Ming-Yiu Sebastian Wong Wedd,Pack Down,AV Technician\r
22/11/2026,09:30,11:30,Lucas Ferreira,VIC-Crown Towers,1019936 - BAND | William Adams 100 Year Celebration - VIC &,Pack Down,Audio L2\r
16/11/2026,00:00,23:59,Lucas Ferreira,VIC-Production,0 - Non Event Shift (unbillable),,RDO\r
20/11/2026,00:30,10:30,Lucas Ferreira,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,AV Technician\r
17/11/2026,06:30,18:00,Lucas Ferreira,VIC-Crown Towers,0973429 - CCH 1&2 | OT  ICS & SCADA Automation Conference,Operate,Audio L2\r
18/11/2026,07:00,17:00,Lucas Ferreira,VIC-Crown Towers,0973429 - CCH 1&2 | OT  ICS & SCADA Automation Conference,Operate,Audio L2\r
19/11/2026,00:00,23:59,Lucas Ferreira,VIC-Production,0 - Non Event Shift (unbillable),,RDO\r
21/11/2026,00:00,23:59,Lucas Ferreira,VIC-Production,0 - Non Event Shift (unbillable),,RDO\r
22/11/2026,11:30,17:00,Lucas Ferreira,VIC-Crown Towers,0905280 - Pal AB | Vermont Secondary College Valedictory Din,Set Up,AV Technician\r
21/11/2026,16:00,17:00,MCG Match Day,VIC-Melbourne Cricket Ground,1012231 - Men’s International T20I Series Australia V Englan,,AV Meet & Greet\r
21/11/2026,17:00,18:00,MCG Match Day,VIC-Melbourne Cricket Ground,1012781 - Men's International T20I Aus Vs Eng | Ryder,,AV Meet & Greet\r
21/11/2026,17:00,18:00,MCG Match Day,VIC-Melbourne Cricket Ground,1019639 - International T20 | Olympic B | 21.11.2026,Operate,AV Meet & Greet\r
19/11/2026,14:00,17:00,Marcus M,VIC-Crown Towers,0966858 - Pal | Padua College Year 12 Valedictory Di,Set Up,AV Technician\r
20/11/2026,09:30,12:00,Mat Fakhry,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Set Up,Audio L2\r
20/11/2026,07:30,08:00,Mat Fakhry,VIC-Melbourne Cricket Ground,,,Prep\r
20/11/2026,08:00,09:30,Mat Fakhry,VIC-Melbourne Cricket Ground,0983300 - Our Lady of Sion Valedictory 2026 | Olympic,Pack Down,Audio L2\r
16/11/2026,08:30,11:30,Matt Border,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Set Up,AV Technician\r
16/11/2026,11:30,14:00,Matt Border,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Operate,Lighting Pinspot Prog\r
17/11/2026,15:30,17:00,Matt Border,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Turnaround,AV Technician\r
18/11/2026,12:00,16:00,Matt Border,VIC-1 Hotel Melbourne,1013924 - Seafarers Set | Deakin Chancellor's Dinner,Set Up,Lighting - GMA3\r
18/11/2026,16:00,22:30,Matt Border,VIC-1 Hotel Melbourne,1013924 - Seafarers Set | Deakin Chancellor's Dinner,Operate,Lighting - GMA3\r
19/11/2026,17:00,00:00,Matt Border,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Set Up,Lighting L2\r
20/11/2026,15:00,23:30,Matt Border,VIC-1 Hotel Melbourne,0990732 - Seafarers | National Skills Event,Operate,Follow Spot Operator\r
17/11/2026,05:30,15:30,Matt Border,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Operate,Lighting L2\r
18/11/2026,22:30,00:00,Matt Crane,VIC-Melbourne Cricket Ground,0962842 - Melbourne Immunotherapy Network | Olympic,Operate,AV L2\r
18/11/2026,16:00,22:30,Matt Crane,VIC-Melbourne Cricket Ground,0962842 - Melbourne Immunotherapy Network | Olympic,Operate,Audio L2\r
20/11/2026,19:00,23:30,Matt Crane,VIC-Hyde Melbourne Place,,,Audio L2\r
21/11/2026,06:00,09:00,Max Kokalis,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Turnaround,EWP Style and Design\r
16/11/2026,08:00,16:00,Mick O'Malley,VIC-Warehouse And Ops,,,Driver Van\r
20/11/2026,08:00,16:00,Mick O'Malley,VIC-Warehouse And Ops,,,Driver Van\r
17/11/2026,11:30,12:00,Mick O'Malley,VIC-Base Event Delivery,1021672 - KLTC | Stadium | Lapel Mics 16 Nov 26,Load Return,Driver Van\r
18/11/2026,08:00,16:00,Mick O'Malley,VIC-Warehouse And Ops,,,Driver Van\r
17/11/2026,12:00,15:00,Mick O'Malley,VIC-Base Event Delivery,1001469 - Ritz Carlton Melb | ANZ Lending Conference,Load Deliver,Driver Van\r
19/11/2026,08:00,16:00,Myf Griffiths,VIC-Warehouse And Ops,,,Warehouse\r
17/11/2026,08:00,16:00,Myf Griffiths,VIC-Warehouse And Ops,,,Warehouse\r
19/11/2026,01:30,23:59,Nathan Cook,VIC-Crown Towers,,,RDO\r
16/11/2026,18:30,00:00,Nathan Cook,VIC-Crown Towers,0973429 - CCH 1&2 | OT  ICS & SCADA Automation Conference,Set Up,Crewleader\r
16/11/2026,13:00,16:00,Nathan Cook,VIC-Crown Towers,1015344 - Garden Room 2&3 | Iron Mountain Meeting,Set Up,EWP OP\r
18/11/2026,20:00,23:00,Nathan Cook,VIC-Crown Towers,1015961 - CCH 1 | Community Collective Event,Set Up,Lighting L2\r
17/11/2026,11:30,12:00,Nathan Cook,VIC-Crown Towers,1016624 - M7 | Delta Agribusiness Supplier Review Meeting,Rehearsal,AV Meet & Greet\r
16/11/2026,16:00,18:30,Nathan Cook,VIC-Crown Towers,1020059 - River 1 | AICC Boardroom - November 2026,Set Up,Crewleader\r
16/11/2026,23:59,00:30,Nathan Cook,VIC-Crown Towers,1021290 - CCH foyer | Exhibitor Stand 16 | OT  ICS&SCADA Aut,Set Up,Crewleader\r
17/11/2026,13:30,16:00,Nathan Cook,VIC-Crown Towers,1017313 - Evergreen | Australian Corporate Games Awards Part,Set Up,AV Technician\r
18/11/2026,16:30,20:00,Nathan Cook,VIC-Crown Towers,1017463 - Horizon | HDI Global EOYC,Set Up,AV Technician\r
18/11/2026,23:00,01:30,Nathan Cook,VIC-Crown Towers,1017830 - River - 2026 HIA Industry Outlook Breakfast,Set Up,Lighting L2\r
21/11/2026,06:30,15:30,Nathan Cook,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Turnaround,AV Technician\r
20/11/2026,00:00,23:59,Nathan Cook,VIC-Crown Towers,,,RDO\r
22/11/2026,00:00,23:59,Nathan Cook,VIC-Crown Towers,,,RDO\r
17/11/2026,19:30,21:30,Nathan Cook,VIC-Crown Towers,0998372 - Promenade 1 & 2 | Finsure & Loankit PD Day '26,Set Up,AV Technician\r
17/11/2026,11:00,11:30,Nathan Cook,VIC-Crown Towers,1020059 - River 1 | AICC Boardroom - November 2026,Rehearsal,AV Meet & Greet\r
17/11/2026,16:00,19:30,Nathan Cook,VIC-Crown Towers,1020235 - Garden | GACM International Forum 2026,Set Up,AV Technician\r
17/11/2026,12:00,13:30,Nathan Cook,VIC-Crown Towers,1000746 - Pall AB | CPA Australia Member Recognition Ceremon,Set Up,AV Technician\r
20/11/2026,03:00,10:30,Nathan Tran,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,EWP Style and Design\r
18/11/2026,07:00,10:00,Nathan Tran,VIC-Pullman Melbourne Albert Park,1020173 - GRAND | Matchroom Boxing,Set Up,Style and Design\r
21/11/2026,06:00,09:00,Nathan Tran,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Turnaround,EWP Style and Design\r
21/11/2026,12:30,18:30,Nayeema Hanif,VIC-1 Hotel Melbourne,1017025 - Set | NAB Platinum Awards,Set Up,AV Technician\r
21/11/2026,10:00,11:00,Nayeema Hanif,VIC-The Langham Melbourne,1003972 - Alto - Wedding of Angela & Ryan,Turnaround,AV Technician\r
17/11/2026,11:30,14:30,Nick Paradise,VIC-Base Event Delivery,1016750 - EA Online Webinars - Siemens 26th November,Operate,DES - Digital Event Director\r
22/11/2026,11:30,17:00,Nick Vassiliou,VIC-Crown Towers,1008061 - Prom 1 & 2 | AI.CARE Conference 2026,Turnaround,AV Technician\r
20/11/2026,09:00,17:00,Nikki Srbinoski,VIC-Warehouse And Ops,,,Warehouse\r
17/11/2026,09:00,17:00,Nikki Srbinoski,VIC-Warehouse And Ops,,,Warehouse\r
18/11/2026,09:00,17:00,Nikki Srbinoski,VIC-Warehouse And Ops,,,Warehouse\r
19/11/2026,09:00,17:00,Nikki Srbinoski,VIC-Warehouse And Ops,,,Warehouse\r
20/11/2026,03:00,10:30,Nina Tran,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,EWP Style and Design\r
18/11/2026,07:00,10:00,Nina Tran,VIC-Pullman Melbourne Albert Park,1020173 - GRAND | Matchroom Boxing,Set Up,Style and Design\r
18/11/2026,23:00,00:30,Nina Tran,VIC-Crown Towers,1017830 - River - 2026 HIA Industry Outlook Breakfast,Set Up,Cancelled Shift - UNPAID\r
20/11/2026,09:30,12:00,Oisin Clarke,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Set Up,Cancelled Shift - UNPAID\r
19/11/2026,09:30,11:00,Oisin Clarke,VIC-Crown Towers,1018292 - Garden Room | AAD 4-Year Strategy Roadshow | M,Set Up,Cancelled Shift - UNPAID\r
19/11/2026,17:30,22:00,Oisin Clarke,VIC-Crown Towers,1011049 - 28 | NAB Dinner,Pack Down,Cancelled Shift - UNPAID\r
20/11/2026,08:00,09:30,Oisin Clarke,VIC-Melbourne Cricket Ground,0983300 - Our Lady of Sion Valedictory 2026 | Olympic,Pack Down,Cancelled Shift - UNPAID\r
19/11/2026,16:00,17:30,Oisin Clarke,VIC-Crown Towers,1016510 - CCH | Community Collective Event,Set Up,Cancelled Shift - UNPAID\r
21/11/2026,12:30,18:30,Oisin Clarke,VIC-1 Hotel Melbourne,1017025 - Set | NAB Platinum Awards,Set Up,Cancelled Shift - UNPAID\r
19/11/2026,12:00,16:00,Oisin Clarke,VIC-Crown Towers,1017952 - RIVER 2&3 | Switch Property Meeting,Set Up,Cancelled Shift - UNPAID\r
21/11/2026,10:00,11:00,Oisin Clarke,VIC-The Langham Melbourne,1003972 - Alto - Wedding of Angela & Ryan,Turnaround,Cancelled Shift - UNPAID\r
16/11/2026,08:00,16:00,Peter Carne,VIC-Warehouse And Ops,,,Driver MR\r
19/11/2026,08:00,16:00,Peter Carne,VIC-Warehouse And Ops,,,Driver MR\r
20/11/2026,08:00,16:00,Peter Carne,VIC-Warehouse And Ops,,,Driver MR\r
17/11/2026,08:00,16:00,Peter Carne,VIC-Warehouse And Ops,,,Driver MR\r
18/11/2026,08:00,16:00,Peter Carne,VIC-Warehouse And Ops,,,Driver MR\r
17/11/2026,13:30,14:00,Raul Tresseno,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Technician On Duty\r
19/11/2026,16:00,23:30,Raul Tresseno,VIC-Pullman Melbourne Albert Park,1006555 - Grand 1-6 | Mac Robertson Girls School Grad,Operate,Vision L2\r
21/11/2026,15:30,00:30,Raul Tresseno,VIC-Crown Towers,0971125 - Pall | William Adams 100 Year Celebration - VIC &,Operate,Vision L2\r
16/11/2026,12:30,16:30,Raul Tresseno,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Technician On Duty\r
16/11/2026,09:30,12:30,Raul Tresseno,VIC-Crown Towers,1008256 - Horzion | Jioseva Vatuniveivuke & Linda Nguyen's W,Pack Down,Crewleader\r
18/11/2026,20:00,23:00,Raul Tresseno,VIC-Crown Towers,1015961 - CCH 1 | Community Collective Event,Set Up,Vision L2\r
16/11/2026,08:00,09:30,Raul Tresseno,VIC-Crown Towers,1020746 - Aviary | Barry Plant Christmas Party,Pack Down,Crewleader\r
21/11/2026,12:30,15:30,Raul Tresseno,VIC-Crown Towers,0966860 - AVIARY | Huy Tu & Belinda Duong's Wedding,Set Up,AV Technician\r
20/11/2026,00:00,23:59,Raul Tresseno,VIC-Crown Towers,,,RDO\r
22/11/2026,00:30,23:59,Raul Tresseno,VIC-Crown Towers,,,RDO\r
17/11/2026,10:00,13:30,Raul Tresseno,VIC-Crown Towers,1000746 - Pall AB | CPA Australia Member Recognition Ceremon,Set Up,Vision L2\r
17/11/2026,14:00,20:30,Raul Tresseno,VIC-Crown Towers,1000746 - Pall AB | CPA Australia Member Recognition Ceremon,Operate,Vision L2\r
18/11/2026,16:30,20:00,Raul Tresseno,VIC-Crown Towers,1017463 - Horizon | HDI Global EOYC,Set Up,AV Technician\r
18/11/2026,23:00,01:30,Raul Tresseno,VIC-Crown Towers,1017830 - River - 2026 HIA Industry Outlook Breakfast,Set Up,EWP Spotter\r
17/11/2026,11:30,14:30,Rebekah Lucas,VIC-Base Event Delivery,1016750 - EA Online Webinars - Siemens 26th November,Operate,DES - L2 Digital Event Tech\r
22/11/2026,12:00,15:00,Reuben Chapman,VIC-Pullman Melbourne Albert Park,1017099 - GRAND 3-7 | WEDDING | Muy and Leroy,Pack Down,AV L2\r
20/11/2026,00:30,10:30,Reuben Chapman,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,AV L2\r
22/11/2026,17:00,18:00,Reuben Chapman,VIC-Pullman Melbourne Albert Park,1004880 - MULTIPLE | ORAL EXAMS,Pack Down,AV L2\r
22/11/2026,15:00,17:00,Reuben Chapman,VIC-Pullman Melbourne Albert Park,1004883 - STATE 3 | USANZ Trainee Week 2026,Set Up,AV L2\r
22/11/2026,18:00,19:30,Reuben Chapman,VIC-Pullman Melbourne Albert Park,1010655 - Lake 1-4 | ANZCA Primary Refresher,Turnaround,AV L2\r
16/11/2026,11:00,11:30,Rohan Hunter,VIC-Hyatt Place Essendon Fields,,,Travel time\r
16/11/2026,12:00,17:00,Rohan Hunter,VIC-Hyatt Place Essendon Fields,1008147 - Australian 1 2 3 Atrium | AIA,Set Up,EWP OP\r
16/11/2026,06:00,11:00,Rohan Hunter,VIC-Events Flemington,1019501 - Northcote HS Graduation 2026 | Atrium,Turnaround,Lighting L2\r
17/11/2026,10:00,22:30,Rohan Hunter,VIC-Hyatt Place Essendon Fields,1008147 - Australian 1 2 3 Atrium | AIA,Operate,AV L2\r
19/11/2026,12:30,15:00,Rohan Hunter,VIC-Hyatt Place Essendon Fields,1002651 - Australian 1 2 3 | Braemar College,Set Up,Lighting L2\r
19/11/2026,15:00,17:00,Rohan Hunter,VIC-Hyatt Place Essendon Fields,1002651 - Australian 1 2 3 | Braemar College,Rehearsal,Lighting L2\r
19/11/2026,17:00,23:00,Rohan Hunter,VIC-Hyatt Place Essendon Fields,1002651 - Australian 1 2 3 | Braemar College,Operate,AV L2\r
19/11/2026,23:00,01:00,Rohan Hunter,VIC-Hyatt Place Essendon Fields,1002651 - Australian 1 2 3 | Braemar College,Pack Down,AV Technician\r
18/11/2026,00:00,23:59,Rohan Hunter,VIC-Production,,,RDO\r
21/11/2026,12:30,20:00,Rohan Hunter,VIC-Hyatt Place Essendon Fields,1016288 - Australia 1 2 3 & Atrium | Coaches Congress,Operate,AV L2\r
22/11/2026,15:00,21:00,Rohan Hunter,VIC-Hyatt Place Essendon Fields,1016288 - Australia 1 2 3 & Atrium | Coaches Congress,Turnaround,AV L2\r
20/11/2026,00:00,23:59,Rohan Hunter,VIC-Production,,,RDO\r
17/11/2026,12:30,13:30,Sam Cash,VIC-Melbourne Cricket Ground,1011221 - WOMCC AGM | Long Room,Set Up,Crewleader\r
20/11/2026,09:30,12:00,Sam Cash,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Set Up,Crewleader\r
21/11/2026,09:00,11:00,Sam Cash,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Pack Down,Crewleader\r
22/11/2026,09:00,11:30,Sam Cash,VIC-Melbourne Cricket Ground,1018334 - 1956 Olympics Anniversary Lunch | Olympic,Set Up,Crewleader\r
20/11/2026,17:00,17:30,Sam Cash,VIC-Melbourne Cricket Ground,1018598 - MCC Bridge CLub - Hans,Pack Down,AV L1\r
20/11/2026,12:00,16:00,Sam Cash,VIC-Melbourne Cricket Ground,1019305 - Celebration of Life for Ian Edney | MDR,Operate,AV L2\r
21/11/2026,11:00,14:30,Sam Cash,VIC-Melbourne Cricket Ground,1019639 - International T20 | Olympic B | 21.11.2026,Set Up,Crewleader\r
22/11/2026,07:30,09:00,Sam Cash,VIC-Melbourne Cricket Ground,1019639 - International T20 | Olympic B | 21.11.2026,Pack Down,Crewleader\r
21/11/2026,08:30,09:00,Sam Cash,VIC-Melbourne Cricket Ground,0 - Non Event Shift (unbillable),,Prep\r
20/11/2026,07:30,08:00,Sam Cash,VIC-Melbourne Cricket Ground,,,Prep\r
21/11/2026,08:00,08:30,Sam Cash,VIC-Melbourne Cricket Ground,1020083 - MCC LRWFS Committee Lunch | Jameson Suite,Pack Down,AV L1\r
16/11/2026,16:00,22:30,Sam Cash,VIC-Melbourne Cricket Ground,1018602 - Islamic College of Sport Graduation Dinner | MDR,Operate,Vision L2\r
18/11/2026,00:00,23:59,Sam Cash,VIC-Melbourne Cricket Ground,,,RDO\r
17/11/2026,14:00,14:30,Sam Cash,VIC-Melbourne Cricket Ground,0963222 - AATC Workshop - Day 1 Hasset,Pack Down,Crewleader\r
20/11/2026,08:00,09:30,Sam Cash,VIC-Melbourne Cricket Ground,0983300 - Our Lady of Sion Valedictory 2026 | Olympic,Pack Down,Crewleader\r
22/11/2026,11:30,13:00,Sam Cash,VIC-Melbourne Cricket Ground,1016123 - Projcon Expo 2026 | Jim Stynes B,Set Up,Crewleader\r
22/11/2026,13:00,15:30,Sam Cash,VIC-Melbourne Cricket Ground,1016127 - Projcon Expo 2026 | Jim Stynes A,Set Up,Crewleader\r
19/11/2026,00:00,23:59,Sam Cash,VIC-Melbourne Cricket Ground,,,RDO\r
17/11/2026,14:30,15:00,Sam Cash,VIC-Melbourne Cricket Ground,1000432 - Members Health General Meeting & AHSA | Hassett,Set Up,Crewleader\r
17/11/2026,11:30,12:30,Sam Cash,VIC-Melbourne Cricket Ground,1019041 - MCC Netball Presentation Dinner | Long Room,Pack Down,Crewleader\r
17/11/2026,15:30,17:00,Sam Cash,VIC-Melbourne Cricket Ground,1019292 - Richmond Football Club Foundation Dinner | CR,Set Up,Crewleader\r
17/11/2026,17:00,21:00,Sam Cash,VIC-Melbourne Cricket Ground,1019292 - Richmond Football Club Foundation Dinner | CR,Rehearsal,AV L2\r
20/11/2026,16:00,17:00,Sam Cash,VIC-Melbourne Cricket Ground,1004147 - Salesian College Business Lunch | AFL Dining,Pack Down,AV L1\r
16/11/2026,09:00,17:00,Sam Holloway,VIC-Production,,,Office\r
18/11/2026,13:00,17:00,Sam Holloway,VIC-Production,,,Office\r
19/11/2026,12:00,17:00,Sam Holloway,VIC-Production,,,Office\r
17/11/2026,10:30,14:00,Sam Holloway,VIC-Pullman Melbourne Albert Park,1020188 - RIGGING | Matchroom Boxing,Set Up,Rigger Advanced\r
17/11/2026,08:00,10:30,Sam Holloway,VIC-Production,,,Office\r
17/11/2026,14:00,17:30,Sam Holloway,VIC-Production,,,Office\r
19/11/2026,07:00,12:00,Sam Holloway,VIC-Pullman Melbourne Albert Park,1020188 - RIGGING | Matchroom Boxing,Pack Down,Rigger Advanced\r
18/11/2026,09:00,13:00,Sam Holloway,VIC-Pullman Melbourne Albert Park,1020188 - RIGGING | Matchroom Boxing,Set Up,Rigger Advanced\r
18/11/2026,22:30,00:30,Sam Holloway,VIC-Pullman Melbourne Albert Park,1020188 - RIGGING | Matchroom Boxing,Pack Down,Rigger Advanced\r
16/11/2026,00:00,23:59,Sam Tyson,VIC-Crown Towers,,,RDO\r
20/11/2026,12:00,14:00,Sam Tyson,VIC-Crown Towers,1004912 - Evergreen | Kubota CE Launch Dinner 2026,Pack Down,Crewleader\r
20/11/2026,14:00,16:00,Sam Tyson,VIC-Crown Towers,1005713 - HRZ | Midori Chui and Ming-Yiu Sebastian Wong Wedd,Turnaround,Crewleader\r
21/11/2026,15:30,00:30,Sam Tyson,VIC-Crown Towers,0971125 - Pall | William Adams 100 Year Celebration - VIC &,Operate,Audio FOH\r
18/11/2026,20:00,23:00,Sam Tyson,VIC-Crown Towers,1015961 - CCH 1 | Community Collective Event,Set Up,Audio L2\r
20/11/2026,10:30,11:30,Sam Tyson,VIC-The Langham Melbourne,1012159 - Alto - Brilliant by Langham Event,Turnaround,AV Technician\r
17/11/2026,00:00,23:59,Sam Tyson,VIC-Crown Towers,,,RDO\r
18/11/2026,16:30,20:00,Sam Tyson,VIC-Crown Towers,1017463 - Horizon | HDI Global EOYC,Set Up,AV Technician\r
18/11/2026,23:00,01:30,Sam Tyson,VIC-Crown Towers,1017830 - River - 2026 HIA Industry Outlook Breakfast,Set Up,EWP OP\r
21/11/2026,12:30,15:30,Sam Tyson,VIC-Crown Towers,0966860 - AVIARY | Huy Tu & Belinda Duong's Wedding,Set Up,AV Technician\r
20/11/2026,16:00,18:00,Sam Tyson,VIC-Crown Towers,1016510 - CCH | Community Collective Event,Pack Down,Crewleader\r
20/11/2026,18:00,21:30,Sam Tyson,VIC-Crown Towers,1016512 - PROM | DINNER | Community Collective Event,Set Up,Crewleader\r
22/11/2026,00:30,23:59,Sam Tyson,VIC-Crown Towers,,,RDO\r
20/11/2026,11:30,12:00,Sam Tyson,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Travel time\r
19/11/2026,14:00,17:00,Sam Tyson,VIC-Crown Towers,0966858 - Pal | Padua College Year 12 Valedictory Di,Set Up,Audio L2\r
19/11/2026,17:00,23:30,Sam Tyson,VIC-Crown Towers,0966858 - Pal | Padua College Year 12 Valedictory Di,Operate,Audio FOH\r
17/11/2026,10:00,22:30,Sarah Nicholas,VIC-Hyatt Place Essendon Fields,1008147 - Australian 1 2 3 Atrium | AIA,Operate,Camera Operator\r
19/11/2026,09:30,15:00,Sarah Nicholas,VIC-1 Hotel Melbourne,1008804 - Seafarers | LFRA Forum,Operate,Camera Operator\r
21/11/2026,08:00,12:00,Sean Want,VIC-CENTREPIECE,1018471 - GH | AFL W Awards 2026,Turnaround,EWP OP\r
17/11/2026,14:30,17:00,Sean Want,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Turnaround,EWP OP\r
19/11/2026,06:00,09:00,Sean Want,VIC-CENTREPIECE,0 - Non Event Shift (unbillable),Start at Base,Loader\r
19/11/2026,09:00,14:00,Sean Want,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Set Up,EWP OP\r
19/11/2026,14:00,17:00,Sean Want,VIC-CENTREPIECE,1010696 - GH FULL EAST | Sports AUS Hall Of Fame (SAHOF),Set Up,EWP OP\r
16/11/2026,00:30,23:59,Sebastian VP,VIC-Crown Towers,,,RDO\r
17/11/2026,00:30,23:59,Sebastian VP,VIC-Crown Towers,,,RDO\r
18/11/2026,00:30,23:59,Sebastian VP,VIC-Crown Towers,,,RDO\r
21/11/2026,12:00,13:30,Sebastian VP,VIC-Crown Towers,1018292 - Garden Room | AAD 4-Year Strategy Roadshow | M,Pack Down,AV Technician\r
21/11/2026,13:30,14:30,Sebastian VP,VIC-Crown Towers,1016512 - PROM | DINNER | Community Collective Event,Operate,Lighting Pinspot Prog\r
22/11/2026,09:00,11:30,Sebastian VP,VIC-Crown Towers,1019936 - BAND | William Adams 100 Year Celebration - VIC &,Pack Down,Crewleader\r
19/11/2026,17:30,22:00,Sebastian VP,VIC-Crown Towers,1011049 - 28 | NAB Dinner,Pack Down,Crewleader\r
19/11/2026,16:00,17:30,Sebastian VP,VIC-Crown Towers,1016510 - CCH | Community Collective Event,Set Up,Crewleader\r
19/11/2026,11:30,16:00,Sebastian VP,VIC-Crown Towers,1017952 - RIVER 2&3 | Switch Property Meeting,Set Up,Crewleader\r
22/11/2026,11:30,17:00,Sebastian VP,VIC-Crown Towers,0905280 - Pal AB | Vermont Secondary College Valedictory Din,Set Up,Crewleader\r
20/11/2026,12:00,00:30,Sebastian VP,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Operate,Audio FOH\r
21/11/2026,14:30,23:30,Sebastian VP,VIC-Crown Towers,1016512 - PROM | DINNER | Community Collective Event,Operate,Audio L2\r
19/11/2026,18:30,19:00,Seb Grech,VIC-Hilton Melb Little Queen St,1002919 - G+C | Phonak Lyric,Set Up,AV Technician\r
18/11/2026,18:00,18:15,Seb Grech,VIC-Pan Pacific Melbourne,1021171 - Woodside 1 | Amex Breakout Room 18/11,,AV Technician\r
19/11/2026,17:00,18:00,Seb Grech,VIC-Hilton Melb Little Queen St,,,Transfer\r
21/11/2026,08:00,12:00,Seb Grech,VIC-CENTREPIECE,1018471 - GH | AFL W Awards 2026,Turnaround,EWP OP\r
17/11/2026,18:00,20:00,Seb Grech,VIC-Melbourne Cricket Ground,1012390 - Goodstart - Vic Conference & Dinner - Olympic,Pack Down,AV Technician\r
17/11/2026,23:00,23:30,Seb Grech,VIC-Melbourne Cricket Ground,1019292 - Richmond Football Club Foundation Dinner | CR,Pack Down,AV Technician\r
20/11/2026,16:30,18:00,Seb Grech,VIC-The Langham Melbourne,0967042 - Ballroom - Department of Neurosurgery,Pack Down,AV Technician\r
19/11/2026,18:00,18:30,Seb Grech,VIC-Hilton Melb Little Queen St,1016798 - Gorman & Chambers | Team 400,Pack Down,AV Technician\r
17/11/2026,20:00,23:00,Seb Grech,VIC-Melbourne Cricket Ground,0962842 - Melbourne Immunotherapy Network | Olympic,Set Up,AV Technician\r
17/11/2026,16:30,18:00,Seb Grech,VIC-Melbourne Cricket Ground,1000427 - Members Health General Meeting & AHSA | JSG,Set Up,AV Technician\r
18/11/2026,18:15,20:45,Seb Grech,VIC-Pan Pacific Melbourne,1020156 - Woodside 3-4 | AMEX,Pack Down,AV Technician\r
20/11/2026,18:00,18:30,Seb Grech,VIC-The Langham Melbourne,1016658 - Alto - Sealogic,Rehearsal,AV Meet & Greet\r
20/11/2026,18:30,20:30,Seb Grech,VIC-The Langham Melbourne,1016658 - Alto - Sealogic,Operate,AV Technician\r
17/11/2026,13:00,18:00,Shannon H,VIC-Base Event Delivery,1001469 - Ritz Carlton Melb | ANZ Lending Conference,Set Up,DES - Digital Event Director\r
18/11/2026,07:00,18:00,Shannon H,VIC-Base Event Delivery,1001469 - Ritz Carlton Melb | ANZ Lending Conference,Operate,DES - Digital Event Director\r
18/11/2026,18:00,19:00,Shannon H,VIC-CENTREPIECE,1015909 - Auditorium | DJSIR End-of-Year Event,Rehearsal,Pre-production\r
19/11/2026,07:30,11:30,Shannon H,VIC-CENTREPIECE,1015909 - Auditorium | DJSIR End-of-Year Event,Operate,DES vMix Operator\r
19/11/2026,12:00,14:00,Shannon H,VIC-CENTREPIECE,1015909 - Auditorium | DJSIR End-of-Year Event,Pack Down,AV Technician\r
18/11/2026,09:30,10:00,Shelby L,VIC-Melbourne Marriott Hotel,1021874 - Moojer | Amazon LLC | 18-19.11.26,,AV Meet & Greet\r
18/11/2026,08:30,09:00,Shelby L,VIC-Melbourne Marriott Hotel,1021291 - Kalk | Sophia Genetics | 17-18.11,,AV Meet & Greet\r
17/11/2026,08:30,09:00,Shelby L,VIC-Melbourne Marriott Hotel,1021291 - Kalk | Sophia Genetics | 17-18.11,Rehearsal,AV Meet & Greet\r
19/11/2026,10:30,11:00,Shelby L,VIC-Melbourne Marriott Hotel,1021291 - Kalk | Sophia Genetics | 17-18.11,Pack Down,AV Technician\r
16/11/2026,09:30,10:00,Shelby L,VIC-Melbourne Marriott Hotel,1021291 - Kalk | Sophia Genetics | 17-18.11,Set Up,AV Technician\r
19/11/2026,09:30,10:00,Shelby L,VIC-Melbourne Marriott Hotel,1021874 - Moojer | Amazon LLC | 18-19.11.26,,AV Meet & Greet\r
20/11/2026,09:00,09:30,Shelby L,VIC-Melbourne Marriott Hotel,1021874 - Moojer | Amazon LLC | 18-19.11.26,,AV Technician\r
20/11/2026,15:00,15:30,Shelby L,VIC-Crowne Plaza Melbourne,,,AV Meet & Greet\r
19/11/2026,06:00,09:00,Ollie Olafsen,VIC-Hyde Melbourne Place,1015513 - Olive | FloQast,Rehearsal,Cancelled Shift - UNPAID\r
16/11/2026,08:30,11:30,Simon-Peter Eas,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Set Up,Crewleader\r
16/11/2026,11:30,14:00,Simon-Peter Eas,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Operate,Vision Senior\r
16/11/2026,14:00,16:00,Simon-Peter Eas,VIC-CENTREPIECE,1022421 - Auditorium | MOPT - Precinct Update,Set Up,AV L1\r
20/11/2026,14:00,00:30,Simon-Peter Eas,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Operate,Lighting L2\r
17/11/2026,15:30,17:00,Simon-Peter Eas,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Turnaround,Crewleader\r
18/11/2026,12:30,15:30,Simon-Peter Eas,VIC-CENTREPIECE,1015909 - Auditorium | DJSIR End-of-Year Event,Set Up,AV Senior\r
21/11/2026,01:30,23:59,Simon-Peter Eas,VIC-Production,0 - Non Event Shift (unbillable),,RDO\r
22/11/2026,01:30,23:59,Simon-Peter Eas,VIC-Production,0 - Non Event Shift (unbillable),,RDO\r
17/11/2026,05:30,15:30,Simon-Peter Eas,VIC-CENTREPIECE,0995665 - GH2&3 | We Are Carlisle,Operate,Vision Senior\r
19/11/2026,09:00,14:00,Simon-Peter Eas,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Set Up,AV Technician\r
18/11/2026,06:30,09:00,Simon-Peter Eas,VIC-Westin Melbourne,1020830 - Executive II | Ridley AGM,Rehearsal,DES vMix Operator\r
18/11/2026,10:00,11:00,Simon-Peter Eas,VIC-Westin Melbourne,1020830 - Executive II | Ridley AGM,Operate,DES vMix Operator\r
18/11/2026,11:00,12:00,Simon-Peter Eas,VIC-Westin Melbourne,1020830 - Executive II | Ridley AGM,Pack Down,DES vMix Operator\r
18/11/2026,08:00,11:00,Indigo Cantley,VIC-Vibe Docklands,,,Venue Duties\r
17/11/2026,13:00,16:00,Indigo Cantley,VIC-Crown Towers,1017313 - Evergreen | Australian Corporate Games Awards Part,Set Up,AV Technician\r
19/11/2026,08:15,08:45,Indigo Cantley,VIC-Melbourne Marriott Hotel,1003854 - Yarra Suites | TMEIC,,AV Meet & Greet\r
20/11/2026,09:00,16:00,Stuart C,VIC-Warehouse And Ops,,,Warehouse\r
16/11/2026,09:00,16:00,Stuart C,VIC-Warehouse And Ops,,,Warehouse\r
18/11/2026,09:00,16:00,Stuart C,VIC-Warehouse And Ops,,,Warehouse\r
17/11/2026,09:00,16:00,Stuart C,VIC-Warehouse And Ops,,,Warehouse\r
18/11/2026,15:30,23:00,Suzy Ferguson,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Operate,Audio F/B\r
17/11/2026,08:30,16:30,Temo Heath,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Prep\r
17/11/2026,08:00,08:30,Temo Heath,VIC-Crown Towers,,,AV Meet & Greet\r
17/11/2026,07:30,08:00,Temo Heath,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Technician On Duty\r
22/11/2026,17:00,19:30,Temo Heath,VIC-Crown Towers,1008068 - Prom 3 | AI.Care Conference 2026,Set Up,AV Technician\r
19/11/2026,08:00,08:30,Temo Heath,VIC-Crown Towers,1017067 - M10 | Nufarm NOV Meeting,Rehearsal,AV Meet & Greet\r
18/11/2026,11:30,16:30,Temo Heath,VIC-Crown Towers,1011049 - 28 | NAB Dinner,Set Up,AV Technician\r
17/11/2026,06:30,07:00,Temo Heath,VIC-Crown Towers,1021290 - CCH foyer | Exhibitor Stand 16 | OT  ICS&SCADA Aut,Rehearsal,AV Meet & Greet\r
16/11/2026,00:00,23:59,Temo Heath,VIC-Crown Towers,,,RDO\r
18/11/2026,09:00,11:30,Temo Heath,VIC-Crown Towers,0966857 - Pal | Frankston High School Valedictory Dinner '26,Set Up,AV Technician\r
17/11/2026,07:00,07:30,Temo Heath,VIC-Crown Towers,1017321 - M1 | Carbonhalo AASB S2 Briefing,Rehearsal,AV Meet & Greet\r
22/11/2026,11:30,17:00,Temo Heath,VIC-Crown Towers,0905280 - Pal AB | Vermont Secondary College Valedictory Din,Set Up,AV Technician\r
21/11/2026,06:30,15:30,Temo Heath,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Turnaround,AV Technician\r
20/11/2026,00:00,23:59,Temo Heath,VIC-Crown Towers,,,RDO\r
19/11/2026,08:30,09:30,Temo Heath,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Technician On Duty\r
19/11/2026,12:30,15:00,Temo Heath,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Technician On Duty\r
19/11/2026,15:30,16:00,Temo Heath,VIC-Crown Towers,0 - Non Event Shift (unbillable),,Technician On Duty\r
19/11/2026,17:00,18:00,Temo Heath,VIC-Crown Towers,1004912 - Evergreen | Kubota CE Launch Dinner 2026,Rehearsal,AV Meet & Greet\r
19/11/2026,16:00,17:00,Temo Heath,VIC-Crown Towers,1017463 - Horizon | HDI Global EOYC,Rehearsal,AV Meet & Greet\r
19/11/2026,11:00,12:30,Temo Heath,VIC-Crown Towers,1017830 - River - 2026 HIA Industry Outlook Breakfast,Pack Down,AV Technician\r
19/11/2026,09:30,11:00,Temo Heath,VIC-Crown Towers,1018292 - Garden Room | AAD 4-Year Strategy Roadshow | M,Set Up,AV Technician\r
19/11/2026,15:00,15:30,Temo Heath,VIC-Crown Towers,1018292 - Garden Room | AAD 4-Year Strategy Roadshow | M,Rehearsal,AV Meet & Greet\r
18/11/2026,10:30,13:30,Theavy Sharpe,VIC-Crown Towers,1004912 - Evergreen | Kubota CE Launch Dinner 2026,Set Up,Crewleader\r
18/11/2026,13:30,17:00,Theavy Sharpe,VIC-Crown Towers,1005319 - River | ANZ Proprietary Lending - Remote Awards Ni,Set Up,Crewleader\r
17/11/2026,00:00,23:59,Theavy Sharpe,VIC-Crown Towers,,,RDO\r
22/11/2026,09:30,11:30,Theavy Sharpe,VIC-Crown Towers,1019936 - BAND | William Adams 100 Year Celebration - VIC &,Pack Down,AV Technician\r
16/11/2026,00:00,23:59,Theavy Sharpe,VIC-Crown Towers,,,RDO\r
19/11/2026,15:30,18:00,Theavy Sharpe,VIC-Crown Towers,1010290 - Prom 1 - Engie Team Building Day,Set Up,Crewleader\r
19/11/2026,07:00,15:30,Theavy Sharpe,VIC-Crown Towers,1015961 - CCH 1 | Community Collective Event,Operate,AV L2\r
18/11/2026,07:00,10:30,Theavy Sharpe,VIC-Crown Towers,1017900 - Horizon | Tim Donohue Client Farewell Lunch,Set Up,Crewleader\r
21/11/2026,06:30,15:30,Theavy Sharpe,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Turnaround,AV Technician\r
20/11/2026,07:30,16:00,Theavy Sharpe,VIC-Crown Towers,1016510 - CCH | Community Collective Event,Operate,AV L2\r
22/11/2026,11:30,17:00,Theavy Sharpe,VIC-Crown Towers,0905280 - Pal AB | Vermont Secondary College Valedictory Din,Set Up,Vision L2\r
16/11/2026,08:00,17:00,Truck XW-71JQ,VIC-Warehouse And Ops,,,Truck\r
20/11/2026,08:00,17:00,Truck XW-71JQ,VIC-Warehouse And Ops,,,Truck\r
17/11/2026,08:00,17:00,Truck XW-71JQ,VIC-Warehouse And Ops,,,Truck\r
18/11/2026,08:00,17:00,Truck XW-71JQ,VIC-Warehouse And Ops,,,Truck\r
19/11/2026,08:00,17:00,Truck XW-71JQ,VIC-Warehouse And Ops,,,Truck\r
19/11/2026,05:00,08:00,Vy Diep,VIC-1 Hotel Melbourne,1008804 - Seafarers | LFRA Forum,Set Up,AV L1\r
22/11/2026,09:00,11:30,Vy Diep,VIC-Melbourne Cricket Ground,1018334 - 1956 Olympics Anniversary Lunch | Olympic,Set Up,AV L1\r
21/11/2026,08:00,12:00,Vy Diep,VIC-CENTREPIECE,1018471 - GH | AFL W Awards 2026,Turnaround,AV L1\r
22/11/2026,07:30,09:00,Vy Diep,VIC-Melbourne Cricket Ground,1019639 - International T20 | Olympic B | 21.11.2026,Pack Down,AV L1\r
22/11/2026,12:00,15:00,Vy Diep,VIC-Pullman Melbourne Albert Park,1017099 - GRAND 3-7 | WEDDING | Muy and Leroy,Pack Down,AV Technician\r
20/11/2026,00:30,10:30,Vy Diep,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,AV Technician\r
16/11/2026,16:30,17:30,Vy Diep,VIC-AC Hotel By Marriott Melb SB,1018113 - Miro | Teva Pharmaceutical,Rehearsal,AV Meet & Greet\r
16/11/2026,10:30,11:30,Vy Diep,VIC-Base Event Delivery,1018398 - Kooyong Tennis Club | AV Installs Temp Hire,Set Up,AV Technician\r
16/11/2026,14:00,16:00,Vy Diep,VIC-CENTREPIECE,1022421 - Auditorium | MOPT - Precinct Update,Set Up,AV L1\r
18/11/2026,18:15,20:45,Vy Diep,VIC-Pan Pacific Melbourne,1020156 - Woodside 3-4 | AMEX,Pack Down,AV Technician\r
22/11/2026,17:00,18:00,Vy Diep,VIC-Pullman Melbourne Albert Park,1004880 - MULTIPLE | ORAL EXAMS,Pack Down,AV Technician\r
22/11/2026,15:00,17:00,Vy Diep,VIC-Pullman Melbourne Albert Park,1004883 - STATE 3 | USANZ Trainee Week 2026,Set Up,AV Technician\r
22/11/2026,18:00,19:30,Vy Diep,VIC-Pullman Melbourne Albert Park,1010655 - Lake 1-4 | ANZCA Primary Refresher,Turnaround,AV Technician\r
16/11/2026,08:00,17:00,Van 1ZO-3MO,VIC-Warehouse And Ops,,,Van\r
20/11/2026,08:00,17:00,Van 1ZO-3MO,VIC-Warehouse And Ops,,,Van\r
18/11/2026,08:00,17:00,Van 1ZO-3MO,VIC-Warehouse And Ops,,,Van\r
19/11/2026,12:30,15:00,Will Iles,VIC-Hyatt Place Essendon Fields,1002651 - Australian 1 2 3 | Braemar College,Set Up,EWP OP\r
19/11/2026,13:00,15:00,Will Iles,VIC-Hyatt Place Essendon Fields,1008149 - Australian 1 2 3 | Buckley Park College,Set Up,AV L2\r
18/11/2026,15:00,16:00,Will Iles,VIC-Hyatt Place Essendon Fields,1008149 - Australian 1 2 3 | Buckley Park College,Rehearsal,AV Meet & Greet\r
19/11/2026,06:30,07:00,Will Iles,VIC-Parkroyal Melbourne Airport,,,AV Meet & Greet\r
19/11/2026,07:00,08:00,Will Iles,VIC-Parkroyal Melbourne Airport,,,Venue Duties\r
16/11/2026,00:00,23:59,Will Iles,VIC-Parkroyal Melbourne Airport,,,RDO\r
17/11/2026,00:00,23:59,Will Iles,VIC-Parkroyal Melbourne Airport,,,RDO\r
20/11/2026,07:30,08:30,Will Iles,VIC-Parkroyal Melbourne Airport,1007805 - Macedon & Lorne | Burnet Institute | 20.11.26,,AV Meet & Greet\r
20/11/2026,08:30,09:30,Will Iles,VIC-Parkroyal Melbourne Airport,,,Venue Duties\r
20/11/2026,09:30,10:00,Will Iles,VIC-Parkroyal Melbourne Airport,1017310 - Mornington | J&J Rheumatology | 20.11.26,,AV Meet & Greet\r
22/11/2026,00:00,23:59,Will Iles,VIC-Parkroyal Melbourne Airport,,,RDO\r
20/11/2026,11:30,15:00,Will Iles,VIC-Melbourne Showgrounds,1021770 - Indian High Tea and Dinner | VIC PAV,Set Up,AV Technician\r
18/11/2026,10:00,10:30,Will Iles,VIC-Parkroyal Melbourne Airport,1012050 - BenWang | Out There Productions | 18.11,,AV L2\r
18/11/2026,07:30,08:00,Will Iles,VIC-Parkroyal Melbourne Airport,,,AV Meet & Greet\r
18/11/2026,08:00,09:00,Will Iles,VIC-Parkroyal Melbourne Airport,1007670 - DayBal | FBIA | 19.11.26,,AV Technician\r
18/11/2026,09:00,10:00,Will Iles,VIC-Parkroyal Melbourne Airport,1008169 - Bairnsdale | CHF | 19.11.26,,AV Technician\r
19/11/2026,08:00,08:30,Will Iles,VIC-Parkroyal Melbourne Airport,1008169 - Bairnsdale | CHF | 19.11.26,,AV Meet & Greet\r
19/11/2026,09:30,10:00,Will Iles,VIC-Parkroyal Melbourne Airport,1007670 - DayBal | FBIA | 19.11.26,,AV Meet & Greet\r
19/11/2026,10:00,12:00,Will Iles,VIC-Parkroyal Melbourne Airport,1007805 - Macedon & Lorne | Burnet Institute | 20.11.26,,AV L2\r
19/11/2026,08:30,09:30,Will Iles,VIC-Parkroyal Melbourne Airport,,,Venue Duties\r
21/11/2026,06:00,13:00,Will Iles,VIC-Hyatt Place Essendon Fields,1016288 - Australia 1 2 3 & Atrium | Coaches Congress,Operate,AV L2\r
20/11/2026,10:00,10:30,Will Iles,VIC-Melbourne Showgrounds,,,Travel time\r
18/11/2026,10:30,13:30,Will Morris,VIC-Crown Towers,1004912 - Evergreen | Kubota CE Launch Dinner 2026,Set Up,AV Technician\r
19/11/2026,08:00,10:00,Will Morris,VIC-Pullman Melbourne Albert Park,1020173 - GRAND | Matchroom Boxing,Pack Down,Style and Design\r
17/11/2026,14:30,17:00,Will Morris,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Turnaround,AV Technician\r
20/11/2026,00:30,10:30,Will Morris,VIC-Crown Towers,1013680 - PAL | Enchanted Ball 2026,Set Up,AV Technician\r
18/11/2026,07:30,10:30,Will Morris,VIC-Crown Towers,1017900 - Horizon | Tim Donohue Client Farewell Lunch,Set Up,AV Technician\r
22/11/2026,11:30,17:00,Will Morris,VIC-Crown Towers,0905280 - Pal AB | Vermont Secondary College Valedictory Din,Set Up,AV Technician\r
19/11/2026,15:30,18:00,Will Morris,VIC-Crown Towers,1010290 - Prom 1 - Engie Team Building Day,Set Up,AV Technician\r
18/11/2026,18:00,18:45,William Pain,VIC-Melbourne Marriott Hotel,1009168 - Exhibition | Skin Health Institute All Staff Forum,Rehearsal,AV Meet & Greet\r
18/11/2026,17:30,18:00,William Pain,VIC-Melbourne Marriott Hotel,1009168 - Exhibition | Skin Health Institute All Staff Forum,Turnaround,AV L1\r
21/11/2026,08:30,10:00,William Pain,VIC-Pullman Melbourne Albert Park,1017099 - GRAND 3-7 | WEDDING | Muy and Leroy,Set Up,AV Technician\r
17/11/2026,14:30,17:00,William Pain,VIC-CENTREPIECE,1011792 - Grand Hall | St Kevins Year 12 Valedictory 2026,Turnaround,EWP OP\r
20/11/2026,07:00,09:00,William Pain,VIC-Events Flemington,1012994 - MP Staff Charity Ball | Atrium,Load Deliver,Driver Van\r
17/11/2026,13:00,14:00,William Pain,VIC-Westin Melbourne,1020830 - Executive II | Ridley AGM,Set Up,AV L1\r
21/11/2026,08:00,08:30,William Pain,VIC-Pullman Melbourne Albert Park,1021426 - Element | Federation Uni,Rehearsal,AV Meet & Greet\r
19/11/2026,13:30,14:00,William Pain,VIC-Westin Melbourne,1021928 - Executive I | Kalamazoo Resources,Rehearsal,AV Meet & Greet\r
18/11/2026,18:45,19:15,William Pain,VIC-Melbourne Marriott Hotel,1017826 - B103 | Global Footcare,Pack Down,AV Technician\r
19/11/2026,16:00,17:00,William Pain,VIC-Westin Melbourne,1004158 - Wine Room | World Vision Australia,Pack Down,AV L1\r
21/11/2026,12:30,14:30,William Pain,VIC-Pullman Melbourne Albert Park,,,AV Technician\r
19/11/2026,18:30,21:00,William Pain,VIC-Melbourne Marriott Hotel,1003854 - Yarra Suites | TMEIC,Pack Down,AV L1\r
22/11/2026,06:30,07:30,William Pain,VIC-Pullman Melbourne Albert Park,1004868 - LAKE 1-2 | USANZ Trainee Week 2026,Rehearsal,AV Meet & Greet\r
21/11/2026,10:00,12:30,William Pain,VIC-Pullman Melbourne Albert Park,1004880 - MULTIPLE | ORAL EXAMS,Set Up,AV Technician\r
17/11/2026,17:30,18:30,William Pain,VIC-Hilton Melb Little Queen St,1016798 - Gorman & Chambers | Team 400,Set Up,AV Technician\r
19/11/2026,17:30,18:00,William Pain,VIC-Westin Melbourne,1017155 - Westin III | 473 Product Launch,Rehearsal,AV Meet & Greet\r
19/11/2026,17:00,17:30,William Pain,VIC-Westin Melbourne,1017155 - Westin III | 473 Product Launch,Turnaround,AV L1\r
22/11/2026,08:00,08:30,William Pain,VIC-Pullman Melbourne Albert Park,1017534 - Park | Squash Aus,Rehearsal,AV Meet & Greet\r
20/11/2026,09:30,12:00,Will Robinson,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Set Up,Audio L1\r
20/11/2026,08:00,09:30,Will Robinson,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Pack Down,Audio L1\r
17/11/2026,10:30,11:30,Will Robinson,VIC-Melbourne Cricket Ground,1018316 - Metro Senior Leadership Forum | MDR,Set Up,AV L1\r
17/11/2026,08:00,10:30,Will Robinson,VIC-Melbourne Cricket Ground,1018602 - Islamic College of Sport Graduation Dinner | MDR,Pack Down,AV L1\r
19/11/2026,07:00,07:30,Will Robinson,VIC-The Langham Melbourne,0997807 - Swanston | Real Estate Dynamics Event,Rehearsal,AV Meet & Greet\r
17/11/2026,13:30,14:30,Will Robinson,VIC-Crown Towers,1015359 - Pall C | CPA Australia Member Recognition Ceremoni,Set Up,AV Technician\r
17/11/2026,14:30,15:00,Will Robinson,VIC-Crown Towers,1015359 - Pall C | CPA Australia Member Recognition Ceremoni,Rehearsal,AV Meet & Greet\r
19/11/2026,08:00,09:30,Will Robinson,VIC-The Langham Melbourne,1010477 - Alto | Brightedge Event,Rehearsal,AV Technician\r
22/11/2026,09:00,11:30,Xavier Clarke,VIC-Melbourne Cricket Ground,1018334 - 1956 Olympics Anniversary Lunch | Olympic,Set Up,AV L1\r
17/11/2026,23:00,23:30,Xavier Clarke,VIC-Melbourne Cricket Ground,1019292 - Richmond Football Club Foundation Dinner | CR,Pack Down,AV L1\r
21/11/2026,11:00,14:30,Xavier Clarke,VIC-Melbourne Cricket Ground,1019639 - International T20 | Olympic B | 21.11.2026,Set Up,AV L1\r
22/11/2026,07:30,09:00,Xavier Clarke,VIC-Melbourne Cricket Ground,1019639 - International T20 | Olympic B | 21.11.2026,Pack Down,AV L1\r
21/11/2026,08:00,09:00,Xavier Clarke,VIC-Melbourne Cricket Ground,1018326 - AMC 2026 Networking | JSG,Pack Down,AV L1\r
17/11/2026,20:00,23:00,Xavier Clarke,VIC-Melbourne Cricket Ground,0962842 - Melbourne Immunotherapy Network | Olympic,Set Up,AV L1\r
19/11/2026,15:00,16:30,Xavier Clarke,VIC-Melbourne Cricket Ground,0962842 - Melbourne Immunotherapy Network | Olympic,Pack Down,AV L1\r
19/11/2026,16:30,18:00,Xavier Clarke,VIC-Melbourne Cricket Ground,0983300 - Our Lady of Sion Valedictory 2026 | Olympic,Set Up,AV L1\r
21/11/2026,09:00,11:00,Xavier Clarke,VIC-Melbourne Cricket Ground,1009870 - Mercy Global Obstetrics Update 26 | Olympic | 20.1,Pack Down,AV L1\r
17/11/2026,18:00,20:00,Xavier Clarke,VIC-Melbourne Cricket Ground,1012390 - Goodstart - Vic Conference & Dinner - Olympic,Pack Down,AV L1\r
22/11/2026,11:30,13:00,Xavier Clarke,VIC-Melbourne Cricket Ground,1016123 - Projcon Expo 2026 | Jim Stynes B,Set Up,AV L1\r
22/11/2026,13:00,15:30,Xavier Clarke,VIC-Melbourne Cricket Ground,1016127 - Projcon Expo 2026 | Jim Stynes A,Set Up,AV L1\r
17/11/2026,07:00,18:00,Zac Barraclough,VIC-Pullman Melbourne Albert Park,1010655 - Lake 1-4 | ANZCA Primary Refresher,Operate,AV L2\r
21/11/2026,15:30,00:30,Zac Barraclough,VIC-Crown Towers,0971125 - Pall | William Adams 100 Year Celebration - VIC &,Operate,Lighting L2\r
22/11/2026,11:30,13:00,Zac Barraclough,VIC-Melbourne Cricket Ground,1016123 - Projcon Expo 2026 | Jim Stynes B,Set Up,AV L1\r
22/11/2026,13:00,15:30,Zac Barraclough,VIC-Melbourne Cricket Ground,1016127 - Projcon Expo 2026 | Jim Stynes A,Set Up,AV L1\r
20/11/2026,15:00,00:00,Zac Barraclough,VIC-CENTREPIECE,0990128 - GH | Emmaus College Valedictory 2026,Operate,Audio L2\r
18/11/2026,16:00,23:30,Zac Barraclough,VIC-Melbourne Showgrounds,1000109 - Suzanne Cory HS Valedictory Dinner 2026 | VIC PAV,Operate,Audio FOH\r
`,M=n(),N=[`day`,`qday`,`hour`],P=A(j,`Timetarget Roster Export 18-11-2026.csv`);function F(e,t){let n=i[t];return e/n.slotHours*n.slotPx}function I(){let e=(0,r.useMemo)(()=>new Date,[]),[t,n]=(0,r.useState)(`hour`),[a,o]=(0,r.useState)([]),[s,c]=(0,r.useState)(null),[l,d]=(0,r.useState)(null),[h,x]=(0,r.useState)(P),[T,E]=(0,r.useState)(null),D=h.origin,O=h.dayCount,k=(0,r.useMemo)(()=>new Date(D.getTime()+O*864e5),[D,O]),j=(0,r.useMemo)(()=>f(e),[e]),I=Math.round((j.getTime()-D.getTime())/864e5),R=I>=0&&I<O,z=(0,r.useRef)(null),B=(0,r.useRef)(null),V=(0,r.useRef)(!1),H=h.departments,U=(0,r.useMemo)(()=>H.map(e=>({id:e.id,name:e.name,events:e.events.map(t=>{let n=C(t.assignments.map(e=>({start:e.start.getTime(),end:e.end.getTime()}))),r=n.length?Math.max(...n)+1:1;return{id:t.id,name:t.name,dept:e.name,laneCount:r,assignments:t.assignments.map((e,t)=>({...e,lane:n[t]??0}))}})})),[H]),W=(0,r.useMemo)(()=>{if(!s)return null;for(let e of U)for(let t of e.events){let n=t.assignments.find(e=>e.id===s);if(n)return{...n,event:t.name,dept:e.name}}return null},[U,s]),G=i[t],K=24/G.slotHours*G.slotPx,q=K*O,J=R?I*K:-K,Y=y(D,O),X=t===`day`?[]:b(D,t,O),Z={"--slot":`${G.slotPx}px`,"--day":`${K}px`,"--timeline":`${q}px`};(0,r.useEffect)(()=>{let e=v(new Date,D,t);d(e>=0&&e<=q?e:null)},[D,t,q]),(0,r.useEffect)(()=>{let e=z.current;if(e){if(!V.current){V.current=!0;let r=window.innerWidth<720?`qday`:`hour`,a=e.querySelector(`.corner`)?.offsetWidth??0,o=i[r],s=(e.clientWidth-a)/o.slotPx*o.slotHours,c=R?s>=18?Math.max(0,I*24-Math.min(6,s-16)):Math.max(0,I*24+8):0;if(B.current=c,r!==t){n(r);return}}B.current!=null&&(e.scrollLeft=F(B.current,t))}},[I,R,t,h]);function Q(e){e.text().then(t=>{x(A(t,e.name)),E(null),c(null),o([]),V.current=!1}).catch(e=>{E(e instanceof Error?e.message:`Couldn't read that CSV.`)})}function $(e){let r=z.current;if(r){let e=i[t];B.current=r.scrollLeft/e.slotPx*e.slotHours}n(e)}function ee(){let e=z.current;if(!e)return;let n=I*24+(t===`day`?0:8);B.current=n,e.scrollTo({left:F(n,t),behavior:`smooth`})}function te(e){o(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])}function ne(e,n){let r=Math.max(0,v(e,D,t)),i=Math.min(q,v(n,D,t));return i-r<1?null:{left:r,width:i-r}}return(0,M.jsxs)(`div`,{className:`shell`,children:[(0,M.jsxs)(`header`,{className:`toolbar`,children:[(0,M.jsxs)(`div`,{className:`brand`,children:[(0,M.jsx)(`span`,{className:`brand-mark`,"aria-hidden":`true`}),(0,M.jsxs)(`div`,{children:[(0,M.jsx)(`h1`,{children:`Retain Target`}),(0,M.jsx)(`p`,{children:T??`${g(D,k)} · ${h.shiftCount.toLocaleString(`en-AU`)} shifts`})]})]}),(0,M.jsxs)(`div`,{className:`controls`,children:[(0,M.jsx)(`div`,{className:`zoom`,role:`radiogroup`,"aria-label":`Zoom`,children:N.map(e=>(0,M.jsx)(`button`,{type:`button`,className:`zoom-btn`,"aria-pressed":t===e,onClick:()=>$(e),children:i[e].label},e))}),(0,M.jsxs)(`label`,{className:`file-btn`,title:h.fileName,children:[`CSV`,(0,M.jsx)(`input`,{type:`file`,accept:`.csv,text/csv`,onChange:e=>{let t=e.currentTarget.files?.[0];t&&Q(t),e.currentTarget.value=``}})]}),(0,M.jsx)(`button`,{type:`button`,className:`today-btn`,onClick:ee,children:`Today`})]})]}),(0,M.jsx)(`div`,{className:`scroller`,ref:z,children:(0,M.jsxs)(`div`,{className:`sheet`,style:Z,children:[(0,M.jsxs)(`div`,{className:`head`,children:[(0,M.jsx)(`div`,{className:`corner`,children:`Events`}),(0,M.jsxs)(`div`,{className:`head-time`,children:[(0,M.jsx)(`div`,{className:`day-row`,children:Y.map((e,n)=>{let r=n===I;return(0,M.jsxs)(`div`,{className:`day-cell`,"data-today":r?`true`:`false`,"data-shade":n%2?`b`:`a`,"data-fine":t===`day`?`false`:`true`,style:{width:K},children:[p(e),r&&K>180?` · Today`:``]},e.toISOString())})}),X.length>0&&(0,M.jsx)(`div`,{className:`slot-row`,children:X.map((e,t)=>{let n=u(e),r=w(e,j);return(0,M.jsx)(`div`,{className:`slot-cell`,"data-shade":t%2?`b`:`a`,"data-today":r?`true`:`false`,"data-day":n.hour===0?`true`:`false`,children:m(e)},e.toISOString())})}),l!=null&&(0,M.jsx)(`div`,{className:`now-head`,style:{left:l}})]})]}),U.map(e=>{let n=!a.includes(e.id);return(0,M.jsxs)(`div`,{children:[(0,M.jsxs)(`div`,{className:`row dept-row`,children:[(0,M.jsxs)(`button`,{type:`button`,className:`dept-label`,"aria-expanded":n,onClick:()=>te(e.id),children:[(0,M.jsx)(`span`,{className:`twisty`,"aria-hidden":`true`,children:n?`−`:`+`}),(0,M.jsx)(`span`,{className:`dept-name`,children:e.name})]}),(0,M.jsx)(L,{todayLeft:J,dayPx:K,zoom:t,nowX:l})]}),n&&e.events.map(e=>(0,M.jsxs)(`div`,{className:`row event-row`,style:{"--lanes":e.laneCount},children:[(0,M.jsx)(`div`,{className:`event-label`,title:e.name,children:(0,M.jsx)(`span`,{className:`event-name`,children:e.name})}),(0,M.jsx)(L,{todayLeft:J,dayPx:K,zoom:t,nowX:l,children:e.assignments.map(e=>{let t=ne(e.start,e.end);if(!t)return null;let n=s===e.id;return(0,M.jsxs)(`button`,{type:`button`,className:`bar`,"data-tone":e.tone,"data-edge":S(e.employee,e.status),"data-on":n?`true`:`false`,style:{"--i":e.lane,left:t.left,width:t.width},"aria-pressed":n,"aria-label":`${e.employee}, ${e.fn}, ${e.role}`,onClick:()=>c(n?null:e.id),children:[(0,M.jsx)(`span`,{className:`bar-name`,children:e.employee}),(0,M.jsx)(`span`,{className:`bar-meta`,children:e.fn?`${e.fn} · ${e.role}`:e.role})]},e.id)})})]},e.id))]},e.id)})]})}),(0,M.jsx)(`footer`,{className:`detail`,"aria-live":`polite`,children:W?(0,M.jsxs)(M.Fragment,{children:[(0,M.jsx)(`span`,{className:`swatch`,"data-tone":W.tone,"aria-hidden":`true`}),(0,M.jsxs)(`div`,{className:`detail-copy`,children:[(0,M.jsx)(`p`,{className:`detail-name`,children:W.employee}),(0,M.jsx)(`p`,{className:`detail-role`,children:W.fn?`${W.fn} · ${W.role}`:W.role}),(0,M.jsxs)(`p`,{className:`detail-meta`,children:[W.event,` · `,W.dept]}),(0,M.jsxs)(`p`,{className:`detail-meta`,children:[_(W.start,W.end),` · `,S(W.employee,W.status)===`open`?`Unassigned`:W.status===`confirmed`?`Confirmed`:`Unconfirmed`]})]})]}):(0,M.jsx)(`p`,{className:`detail-hint`,children:T??`Departments fold with +. Zoom goes down to the hour. Today is blue. Tap a shift for the times.`})})]})}function L({todayLeft:e,dayPx:t,zoom:n,nowX:r,children:i}){return(0,M.jsxs)(`div`,{className:`track`,children:[(0,M.jsx)(`div`,{className:`track-bg`}),(0,M.jsx)(`div`,{className:`today-wash`,style:{left:e,width:t}}),n!==`day`&&(0,M.jsx)(`div`,{className:`hour-lines`}),(0,M.jsx)(`div`,{className:`day-lines`}),i,r!=null&&(0,M.jsx)(`div`,{className:`now`,style:{left:r}})]})}function R(){return(0,M.jsx)(I,{})}export{R as component};