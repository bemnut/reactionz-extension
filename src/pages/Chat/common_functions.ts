import { parsePhoneNumberWithError, ParseError } from "libphonenumber-js";
import { validate as isValidUUID } from "uuid";
import { getLoggedinUser } from "../../helpers/api_helper";

import AF from "../../assets/images/flags/af.svg";
import AL from "../../assets/images/flags/al.svg";
import DZ from "../../assets/images/flags/dz.svg";
import AS from "../../assets/images/flags/as.svg";
import AD from "../../assets/images/flags/ad.svg";
import AO from "../../assets/images/flags/ao.svg";
import AI from "../../assets/images/flags/ai.svg";
import AQ from "../../assets/images/flags/aq.svg";
import AG from "../../assets/images/flags/ag.svg";
import AR from "../../assets/images/flags/ar.svg";
import AM from "../../assets/images/flags/am.svg";
import AW from "../../assets/images/flags/aw.svg";
import AU from "../../assets/images/flags/au.svg";
import AT from "../../assets/images/flags/at.svg";
import AZ from "../../assets/images/flags/az.svg";
import BS from "../../assets/images/flags/bs.svg";
import BH from "../../assets/images/flags/bh.svg";
import BD from "../../assets/images/flags/bd.svg";
import BB from "../../assets/images/flags/bb.svg";
import BY from "../../assets/images/flags/by.svg";
import BE from "../../assets/images/flags/be.svg";
import BZ from "../../assets/images/flags/bz.svg";
import BJ from "../../assets/images/flags/bj.svg";
import BM from "../../assets/images/flags/bm.svg";
import BT from "../../assets/images/flags/bt.svg";
import BO from "../../assets/images/flags/bd.svg";
import BA from "../../assets/images/flags/ba.svg";
import BW from "../../assets/images/flags/bw.svg";
import BR from "../../assets/images/flags/br.svg";
import IO from "../../assets/images/flags/io.svg";
import VG from "../../assets/images/flags/vg.svg";
import BN from "../../assets/images/flags/bn.svg";
import BG from "../../assets/images/flags/bg.svg";
import BF from "../../assets/images/flags/bf.svg";
import BI from "../../assets/images/flags/bi.svg";
import KH from "../../assets/images/flags/kh.svg";
import CM from "../../assets/images/flags/cm.svg";
import CA from "../../assets/images/flags/ca.svg";
import CV from "../../assets/images/flags/cv.svg";
import KY from "../../assets/images/flags/ky.svg";
import CF from "../../assets/images/flags/cf.svg";
import TD from "../../assets/images/flags/td.svg";
import CL from "../../assets/images/flags/cl.svg";
import CN from "../../assets/images/flags/cn.svg";
import CX from "../../assets/images/flags/cx.svg";
import CC from "../../assets/images/flags/cc.svg";
import CO from "../../assets/images/flags/co.svg";
import KM from "../../assets/images/flags/km.svg";
import CK from "../../assets/images/flags/ck.svg";
import CR from "../../assets/images/flags/cr.svg";
import HR from "../../assets/images/flags/hr.svg";
import CU from "../../assets/images/flags/cu.svg";
import CW from "../../assets/images/flags/cw.svg";
import CY from "../../assets/images/flags/cy.svg";
import CZ from "../../assets/images/flags/cz.svg";
import CD from "../../assets/images/flags/cd.svg";
import DK from "../../assets/images/flags/dk.svg";
import DJ from "../../assets/images/flags/dj.svg";
import DM from "../../assets/images/flags/dm.svg";
import DO from "../../assets/images/flags/do.svg";
import TL from "../../assets/images/flags/tl.svg";
import EC from "../../assets/images/flags/ec.svg";
import EG from "../../assets/images/flags/eg.svg";
import SV from "../../assets/images/flags/sv.svg";
import GQ from "../../assets/images/flags/gq.svg";
import ER from "../../assets/images/flags/er.svg";
import EE from "../../assets/images/flags/ee.svg";
import ET from "../../assets/images/flags/et.svg";
import FK from "../../assets/images/flags/fk.svg";
import FO from "../../assets/images/flags/fo.svg";
import FJ from "../../assets/images/flags/fj.svg";
import FI from "../../assets/images/flags/fi.svg";
import FR from "../../assets/images/flags/fr.svg";
import PF from "../../assets/images/flags/pf.svg";
import GA from "../../assets/images/flags/ga.svg";
import GM from "../../assets/images/flags/gm.svg";
import GE from "../../assets/images/flags/ge.svg";
import DE from "../../assets/images/flags/de.svg";
import GH from "../../assets/images/flags/gh.svg";
import GI from "../../assets/images/flags/gi.svg";
import GR from "../../assets/images/flags/gr.svg";
import GL from "../../assets/images/flags/gl.svg";
import GD from "../../assets/images/flags/gd.svg";
import GU from "../../assets/images/flags/gu.svg";
import GT from "../../assets/images/flags/gt.svg";
import GG from "../../assets/images/flags/gg.svg";
import GN from "../../assets/images/flags/gn.svg";
import GW from "../../assets/images/flags/gw.svg";
import GY from "../../assets/images/flags/gy.svg";
import HT from "../../assets/images/flags/ht.svg";
import HN from "../../assets/images/flags/hn.svg";
import HK from "../../assets/images/flags/hk.svg";
import HU from "../../assets/images/flags/hu.svg";
import IS from "../../assets/images/flags/is.svg";
import IN from "../../assets/images/flags/in.svg";
import ID from "../../assets/images/flags/id.svg";
import IR from "../../assets/images/flags/ir.svg";
import IQ from "../../assets/images/flags/iq.svg";
import IE from "../../assets/images/flags/ie.svg";
import IM from "../../assets/images/flags/im.svg";
import IL from "../../assets/images/flags/il.svg";
import IT from "../../assets/images/flags/it.svg";
import CI from "../../assets/images/flags/ci.svg";
import JM from "../../assets/images/flags/jm.svg";
import JP from "../../assets/images/flags/jp.svg";
import JE from "../../assets/images/flags/je.svg";
import JO from "../../assets/images/flags/jo.svg";
import KZ from "../../assets/images/flags/kz.svg";
import KE from "../../assets/images/flags/ke.svg";
import KI from "../../assets/images/flags/ki.svg";
import XK from "../../assets/images/flags/xk.svg";
import KW from "../../assets/images/flags/kw.svg";
import KG from "../../assets/images/flags/kg.svg";
import LA from "../../assets/images/flags/la.svg";
import LV from "../../assets/images/flags/lv.svg";
import LB from "../../assets/images/flags/lb.svg";
import LS from "../../assets/images/flags/ls.svg";
import LR from "../../assets/images/flags/lr.svg";
import LY from "../../assets/images/flags/ly.svg";
import LI from "../../assets/images/flags/li.svg";
import LT from "../../assets/images/flags/lt.svg";
import LU from "../../assets/images/flags/lu.svg";
import MO from "../../assets/images/flags/mo.svg";
import MK from "../../assets/images/flags/mk.svg";
import MG from "../../assets/images/flags/mg.svg";
import MW from "../../assets/images/flags/mw.svg";
import MY from "../../assets/images/flags/my.svg";
import MV from "../../assets/images/flags/mv.svg";
import ML from "../../assets/images/flags/ml.svg";
import MT from "../../assets/images/flags/mt.svg";
import MH from "../../assets/images/flags/mh.svg";
import MR from "../../assets/images/flags/mr.svg";
import MU from "../../assets/images/flags/mu.svg";
import YT from "../../assets/images/flags/yt.svg";
import MX from "../../assets/images/flags/mx.svg";
import FM from "../../assets/images/flags/fm.svg";
import MD from "../../assets/images/flags/md.svg";
import MC from "../../assets/images/flags/mc.svg";
import MN from "../../assets/images/flags/mn.svg";
import ME from "../../assets/images/flags/me.svg";
import MS from "../../assets/images/flags/ms.svg";
import MA from "../../assets/images/flags/ma.svg";
import MZ from "../../assets/images/flags/mz.svg";
import MM from "../../assets/images/flags/mm.svg";
import NA from "../../assets/images/flags/na.svg";
import NR from "../../assets/images/flags/nr.svg";
import NP from "../../assets/images/flags/np.svg";
import NL from "../../assets/images/flags/nl.svg";
//import AN from "../../assets/images/flags/an.svg";
import NC from "../../assets/images/flags/nc.svg";
import NZ from "../../assets/images/flags/nz.svg";
import NI from "../../assets/images/flags/ni.svg";
import NE from "../../assets/images/flags/ne.svg";
import NG from "../../assets/images/flags/ng.svg";
import NU from "../../assets/images/flags/nu.svg";
import KP from "../../assets/images/flags/kp.svg";
import MP from "../../assets/images/flags/mp.svg";
import NO from "../../assets/images/flags/no.svg";
import OM from "../../assets/images/flags/om.svg";
import PK from "../../assets/images/flags/pk.svg";
import PW from "../../assets/images/flags/pw.svg";
import PS from "../../assets/images/flags/ps.svg";
import PA from "../../assets/images/flags/pa.svg";
import PG from "../../assets/images/flags/pg.svg";
import PY from "../../assets/images/flags/py.svg";
import PE from "../../assets/images/flags/pe.svg";
import PH from "../../assets/images/flags/ph.svg";
import PN from "../../assets/images/flags/pn.svg";
import PL from "../../assets/images/flags/pl.svg";
import PT from "../../assets/images/flags/pt.svg";
import PR from "../../assets/images/flags/pr.svg";
import QA from "../../assets/images/flags/qa.svg";
import CG from "../../assets/images/flags/cg.svg";
import RE from "../../assets/images/flags/re.svg";
import RO from "../../assets/images/flags/ro.svg";
import RU from "../../assets/images/flags/ru.svg";
import RW from "../../assets/images/flags/rw.svg";
import BL from "../../assets/images/flags/bl.svg";
import SH from "../../assets/images/flags/sh.svg";
import KN from "../../assets/images/flags/kn.svg";
import LC from "../../assets/images/flags/lc.svg";
import MF from "../../assets/images/flags/mf.svg";
import PM from "../../assets/images/flags/pm.svg";
import VC from "../../assets/images/flags/vc.svg";
import WS from "../../assets/images/flags/ws.svg";
import SM from "../../assets/images/flags/sm.svg";
import ST from "../../assets/images/flags/st.svg";
import SA from "../../assets/images/flags/sa.svg";
import SN from "../../assets/images/flags/sn.svg";
import RS from "../../assets/images/flags/rs.svg";
import SC from "../../assets/images/flags/sc.svg";
import SL from "../../assets/images/flags/sl.svg";
import SG from "../../assets/images/flags/sg.svg";
import SX from "../../assets/images/flags/sx.svg";
import SK from "../../assets/images/flags/sk.svg";
import SI from "../../assets/images/flags/si.svg";
import SB from "../../assets/images/flags/sb.svg";
import SO from "../../assets/images/flags/so.svg";
import ZA from "../../assets/images/flags/za.svg";
import KR from "../../assets/images/flags/kr.svg";
import SS from "../../assets/images/flags/ss.svg";
import ES from "../../assets/images/flags/es.svg";
import LK from "../../assets/images/flags/lk.svg";
import SD from "../../assets/images/flags/sd.svg";
import SR from "../../assets/images/flags/sr.svg";
import SJ from "../../assets/images/flags/sj.svg";
import SZ from "../../assets/images/flags/sz.svg";
import SE from "../../assets/images/flags/se.svg";
import CH from "../../assets/images/flags/ch.svg";
import SY from "../../assets/images/flags/sy.svg";
import TW from "../../assets/images/flags/tw.svg";
import TJ from "../../assets/images/flags/tj.svg";
import TZ from "../../assets/images/flags/tz.svg";
import TH from "../../assets/images/flags/th.svg";
import TG from "../../assets/images/flags/tg.svg";
import TK from "../../assets/images/flags/tk.svg";
import TO from "../../assets/images/flags/to.svg";
import TT from "../../assets/images/flags/tt.svg";
import TN from "../../assets/images/flags/tn.svg";
import TR from "../../assets/images/flags/tr.svg";
import TM from "../../assets/images/flags/tm.svg";
import TC from "../../assets/images/flags/tc.svg";
import TV from "../../assets/images/flags/tv.svg";
import VI from "../../assets/images/flags/vi.svg";
import UG from "../../assets/images/flags/ug.svg";
import UA from "../../assets/images/flags/ua.svg";
import AE from "../../assets/images/flags/ae.svg";
import GB from "../../assets/images/flags/gb.svg";
import US from "../../assets/images/flags/us.svg";
import UY from "../../assets/images/flags/uy.svg";
import UZ from "../../assets/images/flags/uz.svg";
import VU from "../../assets/images/flags/vu.svg";
import VA from "../../assets/images/flags/va.svg";
import VE from "../../assets/images/flags/ve.svg";
import VN from "../../assets/images/flags/vn.svg";
import WF from "../../assets/images/flags/wf.svg";
import EH from "../../assets/images/flags/eh.svg";
import YE from "../../assets/images/flags/ye.svg";
import ZM from "../../assets/images/flags/zm.svg";
import ZW from "../../assets/images/flags/zw.svg";

let _ = require("lodash-contrib");
export const countries = [
    {
        id: "1",
        name: "Afghanistan",
        lat: "33.93911",
        lng: "67.709953",
        iso2: "AF",
        iso3: "AFG",
        phone_code: "93",
        timezone: "Asia/Kabul",
        languages: "fa-AF,ps,uz-AF,tk",
        created_at: null,
        updated_at: null,
    },
    {
        id: "2",
        name: "Albania",
        lat: "41.153332",
        lng: "20.168331",
        iso2: "AL",
        iso3: "ALB",
        phone_code: "355",
        timezone: "Europe/Tirane",
        languages: "sq,el",
        created_at: null,
        updated_at: null,
    },
    {
        id: "3",
        name: "Algeria",
        lat: "28.033886",
        lng: "1.659626",
        iso2: "DZ",
        iso3: "DZA",
        phone_code: "213",
        timezone: "Africa/Algiers",
        languages: "ar-DZ",
        created_at: null,
        updated_at: null,
    },
    {
        id: "4",
        name: "American Samoa",
        lat: "-14.270972",
        lng: "-170.132217",
        iso2: "AS",
        iso3: "ASM",
        phone_code: "1-684",
        timezone: "Pacific/Pago_Pago",
        languages: "en-AS,sm,to",
        created_at: null,
        updated_at: null,
    },
    {
        id: "5",
        name: "Andorra",
        lat: "42.546245",
        lng: "1.601554",
        iso2: "AD",
        iso3: "AND",
        phone_code: "376",
        timezone: "Europe/Andorra",
        languages: "ca",
        created_at: null,
        updated_at: null,
    },
    {
        id: "6",
        name: "Angola",
        lat: "-11.202692",
        lng: "17.873887",
        iso2: "AO",
        iso3: "AGO",
        phone_code: "244",
        timezone: "Africa/Lagos",
        languages: "pt-AO",
        created_at: null,
        updated_at: null,
    },
    {
        id: "7",
        name: "Anguilla",
        lat: "18.220554",
        lng: "-63.068615",
        iso2: "AI",
        iso3: "AIA",
        phone_code: "1-264",
        timezone: "America/Port_of_Spain",
        languages: "en-AI",
        created_at: null,
        updated_at: null,
    },
    {
        id: "8",
        name: "Antarctica",
        lat: "-75.250973",
        lng: "-0.071389",
        iso2: "AQ",
        iso3: "ATA",
        phone_code: "672",
        timezone: "Antarctica/Troll",
        languages: "",
        created_at: null,
        updated_at: null,
    },
    {
        id: "9",
        name: "Antigua and Barbuda",
        lat: "17.060816",
        lng: "-61.796428",
        iso2: "AG",
        iso3: "ATG",
        phone_code: "1-268",
        timezone: "America/Antigua",
        languages: "en-AG",
        created_at: null,
        updated_at: null,
    },
    {
        id: "10",
        name: "Argentina",
        lat: "-38.416097",
        lng: "-63.616672",
        iso2: "AR",
        iso3: "ARG",
        phone_code: "54",
        timezone: "America/Argentina/Buenos_Aires",
        languages: "es-AR,en,it,de,fr,gn",
        created_at: null,
        updated_at: null,
    },
    {
        id: "11",
        name: "Armenia",
        lat: "40.069099",
        lng: "45.038189",
        iso2: "AM",
        iso3: "ARM",
        phone_code: "374",
        timezone: "Asia/Yerevan",
        languages: "hy",
        created_at: null,
        updated_at: null,
    },
    {
        id: "12",
        name: "Aruba",
        lat: "12.52111",
        lng: "-69.968338",
        iso2: "AW",
        iso3: "ABW",
        phone_code: "297",
        timezone: "America/Curacao",
        languages: "nl-AW,es,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "13",
        name: "Australia",
        lat: "-25.274398",
        lng: "133.775136",
        iso2: "AU",
        iso3: "AUS",
        phone_code: "61",
        timezone: "Australia/Sydney",
        languages: "en-AU",
        created_at: null,
        updated_at: null,
    },
    {
        id: "14",
        name: "Austria",
        lat: "47.516231",
        lng: "14.550072",
        iso2: "AT",
        iso3: "AUT",
        phone_code: "43",
        timezone: "Europe/Vienna",
        languages: "de-AT,hr,hu,sl",
        created_at: null,
        updated_at: null,
    },
    {
        id: "15",
        name: "Azerbaijan",
        lat: "40.143105",
        lng: "47.576927",
        iso2: "AZ",
        iso3: "AZE",
        phone_code: "994",
        timezone: "Asia/Baku",
        languages: "az,ru,hy",
        created_at: null,
        updated_at: null,
    },
    {
        id: "16",
        name: "Bahamas",
        lat: "25.03428",
        lng: "-77.39628",
        iso2: "BS",
        iso3: "BHS",
        phone_code: "1-242",
        timezone: "America/Nassau",
        languages: "en-BS",
        created_at: null,
        updated_at: null,
    },
    {
        id: "17",
        name: "Bahrain",
        lat: "25.930414",
        lng: "50.637772",
        iso2: "BH",
        iso3: "BHR",
        phone_code: "973",
        timezone: "Asia/Bahrain",
        languages: "ar-BH,en,fa,ur",
        created_at: null,
        updated_at: null,
    },
    {
        id: "18",
        name: "Bangladesh",
        lat: "23.684994",
        lng: "90.356331",
        iso2: "BD",
        iso3: "BGD",
        phone_code: "880",
        timezone: "Asia/Dhaka",
        languages: "bn-BD,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "19",
        name: "Barbados",
        lat: "13.193887",
        lng: "-59.543198",
        iso2: "BB",
        iso3: "BRB",
        phone_code: "1-246",
        timezone: "America/Barbados",
        languages: "en-BB",
        created_at: null,
        updated_at: null,
    },
    {
        id: "20",
        name: "Belarus",
        lat: "53.709807",
        lng: "27.953389",
        iso2: "BY",
        iso3: "BLR",
        phone_code: "375",
        timezone: "Europe/Minsk",
        languages: "be,ru",
        created_at: null,
        updated_at: null,
    },
    {
        id: "21",
        name: "Belgium",
        lat: "50.503887",
        lng: "4.469936",
        iso2: "BE",
        iso3: "BEL",
        phone_code: "32",
        timezone: "Europe/Brussels",
        languages: "nl-BE,fr-BE,de-BE",
        created_at: null,
        updated_at: null,
    },
    {
        id: "22",
        name: "Belize",
        lat: "17.189877",
        lng: "-88.49765",
        iso2: "BZ",
        iso3: "BLZ",
        phone_code: "501",
        timezone: "America/Belize",
        languages: "en-BZ,es",
        created_at: null,
        updated_at: null,
    },
    {
        id: "23",
        name: "Benin",
        lat: "9.30769",
        lng: "2.315834",
        iso2: "BJ",
        iso3: "BEN",
        phone_code: "229",
        timezone: "Africa/Lagos",
        languages: "fr-BJ",
        created_at: null,
        updated_at: null,
    },
    {
        id: "24",
        name: "Bermuda",
        lat: "32.321384",
        lng: "-64.75737",
        iso2: "BM",
        iso3: "BMU",
        phone_code: "1-441",
        timezone: "Atlantic/Bermuda",
        languages: "en-BM,pt",
        created_at: null,
        updated_at: null,
    },
    {
        id: "25",
        name: "Bhutan",
        lat: "27.514162",
        lng: "90.433601",
        iso2: "BT",
        iso3: "BTN",
        phone_code: "975",
        timezone: "Asia/Thimphu",
        languages: "dz",
        created_at: null,
        updated_at: null,
    },
    {
        id: "26",
        name: "Bolivia",
        lat: "-16.290154",
        lng: "-63.588653",
        iso2: "BO",
        iso3: "BOL",
        phone_code: "591",
        timezone: "America/La_Paz",
        languages: "es-BO,qu,ay",
        created_at: null,
        updated_at: null,
    },
    {
        id: "27",
        name: "Bosnia and Herzegovina",
        lat: "43.915886",
        lng: "17.679076",
        iso2: "BA",
        iso3: "BIH",
        phone_code: "387",
        timezone: "Europe/Belgrade",
        languages: "bs,hr-BA,sr-BA",
        created_at: null,
        updated_at: null,
    },
    {
        id: "28",
        name: "Botswana",
        lat: "-22.328474",
        lng: "24.684866",
        iso2: "BW",
        iso3: "BWA",
        phone_code: "267",
        timezone: "Africa/Maputo",
        languages: "en-BW,tn-BW",
        created_at: null,
        updated_at: null,
    },
    {
        id: "29",
        name: "Brazil",
        lat: "-14.235004",
        lng: "-51.92528",
        iso2: "BR",
        iso3: "BRA",
        phone_code: "55",
        timezone: "America/Sao_Paulo",
        languages: "pt-BR,es,en,fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "30",
        name: "British Indian Ocean Territory",
        lat: "-6.343194",
        lng: "71.876519",
        iso2: "IO",
        iso3: "IOT",
        phone_code: "246",
        timezone: "Indian/Chagos",
        languages: "en-IO",
        created_at: null,
        updated_at: null,
    },
    {
        id: "31",
        name: "British Virgin Islands",
        lat: "18.420695",
        lng: "-64.639968",
        iso2: "VG",
        iso3: "VGB",
        phone_code: "1-284",
        timezone: "America/Port_of_Spain",
        languages: "en-VG",
        created_at: null,
        updated_at: null,
    },
    {
        id: "32",
        name: "Brunei",
        lat: "4.535277",
        lng: "114.727669",
        iso2: "BN",
        iso3: "BRN",
        phone_code: "673",
        timezone: "Asia/Brunei",
        languages: "ms-BN,en-BN",
        created_at: null,
        updated_at: null,
    },
    {
        id: "33",
        name: "Bulgaria",
        lat: "42.733883",
        lng: "25.48583",
        iso2: "BG",
        iso3: "BGR",
        phone_code: "359",
        timezone: "Europe/Sofia",
        languages: "bg,tr-BG",
        created_at: null,
        updated_at: null,
    },
    {
        id: "34",
        name: "Burkina Faso",
        lat: "12.238333",
        lng: "-1.561593",
        iso2: "BF",
        iso3: "BFA",
        phone_code: "226",
        timezone: "Africa/Abidjan",
        languages: "fr-BF",
        created_at: null,
        updated_at: null,
    },
    {
        id: "35",
        name: "Burundi",
        lat: "-3.373056",
        lng: "29.918886",
        iso2: "BI",
        iso3: "BDI",
        phone_code: "257",
        timezone: "Africa/Maputo",
        languages: "fr-BI,rn",
        created_at: null,
        updated_at: null,
    },
    {
        id: "36",
        name: "Cambodia",
        lat: "12.565679",
        lng: "104.990963",
        iso2: "KH",
        iso3: "KHM",
        phone_code: "855",
        timezone: "Asia/Phnom_Penh",
        languages: "km,fr,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "37",
        name: "Cameroon",
        lat: "7.369722",
        lng: "12.354722",
        iso2: "CM",
        iso3: "CMR",
        phone_code: "237",
        timezone: "Africa/Lagos",
        languages: "en-CM,fr-CM",
        created_at: null,
        updated_at: null,
    },
    {
        id: "38",
        name: "Canada",
        lat: "56.130366",
        lng: "-106.346771",
        iso2: "CA",
        iso3: "CAN",
        phone_code: "1",
        timezone: "America/Toronto",
        languages: "en-CA,fr-CA,iu",
        created_at: null,
        updated_at: null,
    },
    {
        id: "39",
        name: "Cape Verde",
        lat: "16.002082",
        lng: "-24.013197",
        iso2: "CV",
        iso3: "CPV",
        phone_code: "238",
        timezone: "Atlantic/Cape_Verde",
        languages: "pt-CV",
        created_at: null,
        updated_at: null,
    },
    {
        id: "40",
        name: "Cayman Islands",
        lat: "19.513469",
        lng: "-80.566956",
        iso2: "KY",
        iso3: "CYM",
        phone_code: "1-345",
        timezone: "America/Cayman",
        languages: "en-KY",
        created_at: null,
        updated_at: null,
    },
    {
        id: "41",
        name: "Central African Republic",
        lat: "6.611111",
        lng: "20.939444",
        iso2: "CF",
        iso3: "CAF",
        phone_code: "236",
        timezone: "Africa/Lagos",
        languages: "fr-CF,sg,ln,kg",
        created_at: null,
        updated_at: null,
    },
    {
        id: "42",
        name: "Chad",
        lat: "15.454166",
        lng: "18.732207",
        iso2: "TD",
        iso3: "TCD",
        phone_code: "235",
        timezone: "Africa/Ndjamena",
        languages: "fr-TD,ar-TD,sre",
        created_at: null,
        updated_at: null,
    },
    {
        id: "43",
        name: "Chile",
        lat: "-35.675147",
        lng: "-71.542969",
        iso2: "CL",
        iso3: "CHL",
        phone_code: "56",
        timezone: "America/Santiago",
        languages: "es-CL",
        created_at: null,
        updated_at: null,
    },
    {
        id: "44",
        name: "China",
        lat: "35.86166",
        lng: "104.195397",
        iso2: "CN",
        iso3: "CHN",
        phone_code: "86",
        timezone: "Asia/Shanghai",
        languages: "zh-CN,yue,wuu,dta,ug,za",
        created_at: null,
        updated_at: null,
    },
    {
        id: "45",
        name: "Christmas Island",
        lat: "-10.447525",
        lng: "105.690449",
        iso2: "CX",
        iso3: "CXR",
        phone_code: "61",
        timezone: "Indian/Christmas",
        languages: "en,zh,ms-CC",
        created_at: null,
        updated_at: null,
    },
    {
        id: "46",
        name: "Cocos Islands",
        lat: "-12.164165",
        lng: "96.870956",
        iso2: "CC",
        iso3: "CCK",
        phone_code: "61",
        timezone: "Indian/Cocos",
        languages: "ms-CC,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "47",
        name: "Colombia",
        lat: "4.570868",
        lng: "-74.297333",
        iso2: "CO",
        iso3: "COL",
        phone_code: "57",
        timezone: "America/Bogota",
        languages: "es-CO",
        created_at: null,
        updated_at: null,
    },
    {
        id: "48",
        name: "Comoros",
        lat: "-11.875001",
        lng: "43.872219",
        iso2: "KM",
        iso3: "COM",
        phone_code: "269",
        timezone: "Indian/Comoro",
        languages: "ar,fr-KM",
        created_at: null,
        updated_at: null,
    },
    {
        id: "49",
        name: "Cook Islands",
        lat: "-21.236736",
        lng: "-159.777671",
        iso2: "CK",
        iso3: "COK",
        phone_code: "682",
        timezone: "Pacific/Rarotonga",
        languages: "en-CK,mi",
        created_at: null,
        updated_at: null,
    },
    {
        id: "50",
        name: "Costa Rica",
        lat: "9.748917",
        lng: "-83.753428",
        iso2: "CR",
        iso3: "CRI",
        phone_code: "506",
        timezone: "America/Costa_Rica",
        languages: "es-CR,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "51",
        name: "Croatia",
        lat: "45.1",
        lng: "15.2",
        iso2: "HR",
        iso3: "HRV",
        phone_code: "385",
        timezone: "Europe/Belgrade",
        languages: "hr-HR,sr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "52",
        name: "Cuba",
        lat: "21.521757",
        lng: "-77.781167",
        iso2: "CU",
        iso3: "CUB",
        phone_code: "53",
        timezone: "America/Havana",
        languages: "es-CU",
        created_at: null,
        updated_at: null,
    },
    {
        id: "53",
        name: "Curacao",
        lat: "12.16957",
        lng: "-68.990021",
        iso2: "CW",
        iso3: "CUW",
        phone_code: "599",
        timezone: "America/Curacao",
        languages: "nl,pap",
        created_at: null,
        updated_at: null,
    },
    {
        id: "54",
        name: "Cyprus",
        lat: "35.126413",
        lng: "33.429859",
        iso2: "CY",
        iso3: "CYP",
        phone_code: "357",
        timezone: "Asia/Nicosia",
        languages: "el-CY,tr-CY,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "55",
        name: "Czech Republic",
        lat: "49.817492",
        lng: "15.472962",
        iso2: "CZ",
        iso3: "CZE",
        phone_code: "420",
        timezone: "Europe/Prague",
        languages: "cs,sk",
        created_at: null,
        updated_at: null,
    },
    {
        id: "56",
        name: "Democratic Republic of the Congo",
        lat: "-4.038333",
        lng: "21.758664",
        iso2: "CD",
        iso3: "COD",
        phone_code: "243",
        timezone: "Africa/Lagos",
        languages: "fr-CD,ln,kg",
        created_at: null,
        updated_at: null,
    },
    {
        id: "57",
        name: "Denmark",
        lat: "56.26392",
        lng: "9.501785",
        iso2: "DK",
        iso3: "DNK",
        phone_code: "45",
        timezone: "Europe/Copenhagen",
        languages: "da-DK,en,fo,de-DK",
        created_at: null,
        updated_at: null,
    },
    {
        id: "58",
        name: "Djibouti",
        lat: "11.825138",
        lng: "42.590275",
        iso2: "DJ",
        iso3: "DJI",
        phone_code: "253",
        timezone: "Africa/Djibouti",
        languages: "fr-DJ,ar,so-DJ,aa",
        created_at: null,
        updated_at: null,
    },
    {
        id: "59",
        name: "Dominica",
        lat: "15.414999",
        lng: "-61.370976",
        iso2: "DM",
        iso3: "DMA",
        phone_code: "1-767",
        timezone: "America/Port_of_Spain",
        languages: "en-DM",
        created_at: null,
        updated_at: null,
    },
    {
        id: "60",
        name: "Dominican Republic",
        lat: "18.735693",
        lng: "-70.162651",
        iso2: "DO",
        iso3: "DOM",
        phone_code: "1-809, 1-829, 1-849",
        timezone: "America/Santo_Domingo",
        languages: "es-DO",
        created_at: null,
        updated_at: null,
    },
    {
        id: "61",
        name: "East Timor",
        lat: "-8.874217",
        lng: "125.727539",
        iso2: "TL",
        iso3: "TLS",
        phone_code: "670",
        timezone: "Asia/Dili",
        languages: "tet,pt-TL,id,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "62",
        name: "Ecuador",
        lat: "-1.831239",
        lng: "-78.183406",
        iso2: "EC",
        iso3: "ECU",
        phone_code: "593",
        timezone: "America/Guayaquil",
        languages: "es-EC",
        created_at: null,
        updated_at: null,
    },
    {
        id: "63",
        name: "Egypt",
        lat: "26.820553",
        lng: "30.802498",
        iso2: "EG",
        iso3: "EGY",
        phone_code: "20",
        timezone: "Africa/Cairo",
        languages: "ar-EG,en,fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "64",
        name: "El Salvador",
        lat: "13.794185",
        lng: "-88.89653",
        iso2: "SV",
        iso3: "SLV",
        phone_code: "503",
        timezone: "America/El_Salvador",
        languages: "es-SV",
        created_at: null,
        updated_at: null,
    },
    {
        id: "65",
        name: "Equatorial Guinea",
        lat: "1.650801",
        lng: "10.267895",
        iso2: "GQ",
        iso3: "GNQ",
        phone_code: "240",
        timezone: "Africa/Lagos",
        languages: "es-GQ,fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "66",
        name: "Eritrea",
        lat: "15.179384",
        lng: "39.782334",
        iso2: "ER",
        iso3: "ERI",
        phone_code: "291",
        timezone: "Africa/Asmara",
        languages: "aa-ER,ar,tig,kun,ti-ER",
        created_at: null,
        updated_at: null,
    },
    {
        id: "67",
        name: "Estonia",
        lat: "58.595272",
        lng: "25.013607",
        iso2: "EE",
        iso3: "EST",
        phone_code: "372",
        timezone: "Europe/Tallinn",
        languages: "et,ru",
        created_at: null,
        updated_at: null,
    },
    {
        id: "68",
        name: "Ethiopia",
        lat: "9.145",
        lng: "40.489673",
        iso2: "ET",
        iso3: "ETH",
        phone_code: "251",
        timezone: "Africa/Addis_Ababa",
        languages: "am,en-ET,om-ET,ti-ET,so-ET,sid",
        created_at: null,
        updated_at: null,
    },
    {
        id: "69",
        name: "Falkland Islands",
        lat: "-51.796253",
        lng: "-59.523613",
        iso2: "FK",
        iso3: "FLK",
        phone_code: "500",
        timezone: "Atlantic/Stanley",
        languages: "en-FK",
        created_at: null,
        updated_at: null,
    },
    {
        id: "70",
        name: "Faroe Islands",
        lat: "61.892635",
        lng: "-6.911806",
        iso2: "FO",
        iso3: "FRO",
        phone_code: "298",
        timezone: "Atlantic/Faroe",
        languages: "fo,da-FO",
        created_at: null,
        updated_at: null,
    },
    {
        id: "71",
        name: "Fiji",
        lat: "-16.578193",
        lng: "179.414413",
        iso2: "FJ",
        iso3: "FJI",
        phone_code: "679",
        timezone: "Pacific/Fiji",
        languages: "en-FJ,fj",
        created_at: null,
        updated_at: null,
    },
    {
        id: "72",
        name: "Finland",
        lat: "61.92411",
        lng: "25.748151",
        iso2: "FI",
        iso3: "FIN",
        phone_code: "358",
        timezone: "Europe/Helsinki",
        languages: "fi-FI,sv-FI,smn",
        created_at: null,
        updated_at: null,
    },
    {
        id: "73",
        name: "France",
        lat: "46.227638",
        lng: "2.213749",
        iso2: "FR",
        iso3: "FRA",
        phone_code: "33",
        timezone: "Europe/Paris",
        languages: "fr-FR,frp,br,co,ca,eu,oc",
        created_at: null,
        updated_at: null,
    },
    {
        id: "74",
        name: "French Polynesia",
        lat: "-17.679742",
        lng: "-149.406843",
        iso2: "PF",
        iso3: "PYF",
        phone_code: "689",
        timezone: "Pacific/Tahiti",
        languages: "fr-PF,ty",
        created_at: null,
        updated_at: null,
    },
    {
        id: "75",
        name: "Gabon",
        lat: "-0.803689",
        lng: "11.609444",
        iso2: "GA",
        iso3: "GAB",
        phone_code: "241",
        timezone: "Africa/Lagos",
        languages: "fr-GA",
        created_at: null,
        updated_at: null,
    },
    {
        id: "76",
        name: "Gambia",
        lat: "13.443182",
        lng: "-15.310139",
        iso2: "GM",
        iso3: "GMB",
        phone_code: "220",
        timezone: "Africa/Abidjan",
        languages: "en-GM,mnk,wof,wo,ff",
        created_at: null,
        updated_at: null,
    },
    {
        id: "77",
        name: "Georgia",
        lat: "42.315407",
        lng: "43.356892",
        iso2: "GE",
        iso3: "GEO",
        phone_code: "995",
        timezone: "Asia/Tbilisi",
        languages: "ka,ru,hy,az",
        created_at: null,
        updated_at: null,
    },
    {
        id: "78",
        name: "Germany",
        lat: "51.165691",
        lng: "10.451526",
        iso2: "DE",
        iso3: "DEU",
        phone_code: "49",
        timezone: "Europe/Berlin",
        languages: "de",
        created_at: null,
        updated_at: null,
    },
    {
        id: "79",
        name: "Ghana",
        lat: "7.946527",
        lng: "-1.023194",
        iso2: "GH",
        iso3: "GHA",
        phone_code: "233",
        timezone: "Africa/Accra",
        languages: "en-GH,ak,ee,tw",
        created_at: null,
        updated_at: null,
    },
    {
        id: "80",
        name: "Gibraltar",
        lat: "36.137741",
        lng: "-5.345374",
        iso2: "GI",
        iso3: "GIB",
        phone_code: "350",
        timezone: "Europe/Gibraltar",
        languages: "en-GI,es,it,pt",
        created_at: null,
        updated_at: null,
    },
    {
        id: "81",
        name: "Greece",
        lat: "39.074208",
        lng: "21.824312",
        iso2: "GR",
        iso3: "GRC",
        phone_code: "30",
        timezone: "Europe/Athens",
        languages: "el-GR,en,fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "82",
        name: "Greenland",
        lat: "71.706936",
        lng: "-42.604303",
        iso2: "GL",
        iso3: "GRL",
        phone_code: "299",
        timezone: "America/Godthab",
        languages: "kl,da-GL,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "83",
        name: "Grenada",
        lat: "12.262776",
        lng: "-61.604171",
        iso2: "GD",
        iso3: "GRD",
        phone_code: "1-473",
        timezone: "America/Port_of_Spain",
        languages: "en-GD",
        created_at: null,
        updated_at: null,
    },
    {
        id: "84",
        name: "Guam",
        lat: "13.444304",
        lng: "144.793731",
        iso2: "GU",
        iso3: "GUM",
        phone_code: "1-671",
        timezone: "Pacific/Guam",
        languages: "en-GU,ch-GU",
        created_at: null,
        updated_at: null,
    },
    {
        id: "85",
        name: "Guatemala",
        lat: "15.783471",
        lng: "-90.230759",
        iso2: "GT",
        iso3: "GTM",
        phone_code: "502",
        timezone: "America/Guatemala",
        languages: "es-GT",
        created_at: null,
        updated_at: null,
    },
    {
        id: "86",
        name: "Guernsey",
        lat: "49.465691",
        lng: "-2.585278",
        iso2: "GG",
        iso3: "GGY",
        phone_code: "44-1481",
        timezone: "Europe/London",
        languages: "en,fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "87",
        name: "Guinea",
        lat: "9.945587",
        lng: "-9.696645",
        iso2: "GN",
        iso3: "GIN",
        phone_code: "224",
        timezone: "Africa/Abidjan",
        languages: "fr-GN",
        created_at: null,
        updated_at: null,
    },
    {
        id: "88",
        name: "Guinea-Bissau",
        lat: "11.803749",
        lng: "-15.180413",
        iso2: "GW",
        iso3: "GNB",
        phone_code: "245",
        timezone: "Africa/Bissau",
        languages: "pt-GW,pov",
        created_at: null,
        updated_at: null,
    },
    {
        id: "89",
        name: "Guyana",
        lat: "4.860416",
        lng: "-58.93018",
        iso2: "GY",
        iso3: "GUY",
        phone_code: "592",
        timezone: "America/Guyana",
        languages: "en-GY",
        created_at: null,
        updated_at: null,
    },
    {
        id: "90",
        name: "Haiti",
        lat: "18.971187",
        lng: "-72.285215",
        iso2: "HT",
        iso3: "HTI",
        phone_code: "509",
        timezone: "America/Port-au-Prince",
        languages: "ht,fr-HT",
        created_at: null,
        updated_at: null,
    },
    {
        id: "91",
        name: "Honduras",
        lat: "15.199999",
        lng: "-86.241905",
        iso2: "HN",
        iso3: "HND",
        phone_code: "504",
        timezone: "America/Tegucigalpa",
        languages: "es-HN",
        created_at: null,
        updated_at: null,
    },
    {
        id: "92",
        name: "Hong Kong",
        lat: "22.396428",
        lng: "114.109497",
        iso2: "HK",
        iso3: "HKG",
        phone_code: "852",
        timezone: "Asia/Hong_Kong",
        languages: "zh-HK,yue,zh,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "93",
        name: "Hungary",
        lat: "47.162494",
        lng: "19.503304",
        iso2: "HU",
        iso3: "HUN",
        phone_code: "36",
        timezone: "Europe/Budapest",
        languages: "hu-HU",
        created_at: null,
        updated_at: null,
    },
    {
        id: "94",
        name: "Iceland",
        lat: "64.963051",
        lng: "-19.020835",
        iso2: "IS",
        iso3: "ISL",
        phone_code: "354",
        timezone: "Atlantic/Reykjavik",
        languages: "is,en,de,da,sv,no",
        created_at: null,
        updated_at: null,
    },
    {
        id: "95",
        name: "India",
        lat: "20.593684",
        lng: "78.96288",
        iso2: "IN",
        iso3: "IND",
        phone_code: "91",
        timezone: "Asia/Kolkata",
        languages:
            "en-IN,hi,bn,te,mr,ta,ur,gu,kn,ml,or,pa,as,bh,sat,ks,ne,sd,kok,doi,mni,sit,sa,fr,lus,inc",
        created_at: null,
        updated_at: null,
    },
    {
        id: "96",
        name: "Indonesia",
        lat: "-0.789275",
        lng: "113.921327",
        iso2: "ID",
        iso3: "IDN",
        phone_code: "62",
        timezone: "Asia/Jakarta",
        languages: "id,en,nl,jv",
        created_at: null,
        updated_at: null,
    },
    {
        id: "97",
        name: "Iran",
        lat: "32.427908",
        lng: "53.688046",
        iso2: "IR",
        iso3: "IRN",
        phone_code: "98",
        timezone: "Asia/Tehran",
        languages: "fa-IR,ku",
        created_at: null,
        updated_at: null,
    },
    {
        id: "98",
        name: "Iraq",
        lat: "33.223191",
        lng: "43.679291",
        iso2: "IQ",
        iso3: "IRQ",
        phone_code: "964",
        timezone: "Asia/Baghdad",
        languages: "ar-IQ,ku,hy",
        created_at: null,
        updated_at: null,
    },
    {
        id: "99",
        name: "Ireland",
        lat: "53.41291",
        lng: "-8.24389",
        iso2: "IE",
        iso3: "IRL",
        phone_code: "353",
        timezone: "Europe/Dublin",
        languages: "en-IE,ga-IE",
        created_at: null,
        updated_at: null,
    },
    {
        id: "100",
        name: "Isle of Man",
        lat: "54.236107",
        lng: "-4.548056",
        iso2: "IM",
        iso3: "IMN",
        phone_code: "44-1624",
        timezone: "Europe/London",
        languages: "en,gv",
        created_at: null,
        updated_at: null,
    },
    {
        id: "101",
        name: "Israel",
        lat: "31.046051",
        lng: "34.851612",
        iso2: "IL",
        iso3: "ISR",
        phone_code: "972",
        timezone: "Asia/Jerusalem",
        languages: "he,ar-IL,en-IL,",
        created_at: null,
        updated_at: null,
    },
    {
        id: "102",
        name: "Italy",
        lat: "41.87194",
        lng: "12.56738",
        iso2: "IT",
        iso3: "ITA",
        phone_code: "39",
        timezone: "Europe/Rome",
        languages: "it-IT,de-IT,fr-IT,sc,ca,co,sl",
        created_at: null,
        updated_at: null,
    },
    {
        id: "103",
        name: "Ivory Coast",
        lat: "7.539989",
        lng: "-5.54708",
        iso2: "CI",
        iso3: "CIV",
        phone_code: "225",
        timezone: "Africa/Abidjan",
        languages: "fr-CI",
        created_at: null,
        updated_at: null,
    },
    {
        id: "104",
        name: "Jamaica",
        lat: "18.109581",
        lng: "-77.297508",
        iso2: "JM",
        iso3: "JAM",
        phone_code: "1-876",
        timezone: "America/Jamaica",
        languages: "en-JM",
        created_at: null,
        updated_at: null,
    },
    {
        id: "105",
        name: "Japan",
        lat: "36.204824",
        lng: "138.252924",
        iso2: "JP",
        iso3: "JPN",
        phone_code: "81",
        timezone: "Asia/Tokyo",
        languages: "ja",
        created_at: null,
        updated_at: null,
    },
    {
        id: "106",
        name: "Jersey",
        lat: "49.214439",
        lng: "-2.13125",
        iso2: "JE",
        iso3: "JEY",
        phone_code: "44-1534",
        timezone: "Europe/London",
        languages: "en,pt",
        created_at: null,
        updated_at: null,
    },
    {
        id: "107",
        name: "Jordan",
        lat: "30.585164",
        lng: "36.238414",
        iso2: "JO",
        iso3: "JOR",
        phone_code: "962",
        timezone: "Asia/Amman",
        languages: "ar-JO,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "108",
        name: "Kazakhstan",
        lat: "48.019573",
        lng: "66.923684",
        iso2: "KZ",
        iso3: "KAZ",
        phone_code: "7",
        timezone: "Asia/Almaty",
        languages: "kk,ru",
        created_at: null,
        updated_at: null,
    },
    {
        id: "109",
        name: "Kenya",
        lat: "-0.023559",
        lng: "37.906193",
        iso2: "KE",
        iso3: "KEN",
        phone_code: "254",
        timezone: "Africa/Nairobi",
        languages: "en-KE,sw-KE",
        created_at: null,
        updated_at: null,
    },
    {
        id: "110",
        name: "Kiribati",
        lat: "-3.370417",
        lng: "-168.734039",
        iso2: "KI",
        iso3: "KIR",
        phone_code: "686",
        timezone: "Pacific/Tarawa",
        languages: "en-KI,gil",
        created_at: null,
        updated_at: null,
    },
    {
        id: "111",
        name: "Kosovo",
        lat: "42.602636",
        lng: "20.902977",
        iso2: "XK",
        iso3: "XKX",
        phone_code: "383",
        timezone: "Europe/Belgrade",
        languages: "sq,sr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "112",
        name: "Kuwait",
        lat: "29.31166",
        lng: "47.481766",
        iso2: "KW",
        iso3: "KWT",
        phone_code: "965",
        timezone: "Asia/Kuwait",
        languages: "ar-KW,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "113",
        name: "Kyrgyzstan",
        lat: "41.20438",
        lng: "74.766098",
        iso2: "KG",
        iso3: "KGZ",
        phone_code: "996",
        timezone: "Asia/Bishkek",
        languages: "ky,uz,ru",
        created_at: null,
        updated_at: null,
    },
    {
        id: "114",
        name: "Laos",
        lat: "19.85627",
        lng: "102.495496",
        iso2: "LA",
        iso3: "LAO",
        phone_code: "856",
        timezone: "Asia/Vientiane",
        languages: "lo,fr,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "115",
        name: "Latvia",
        lat: "56.879635",
        lng: "24.603189",
        iso2: "LV",
        iso3: "LVA",
        phone_code: "371",
        timezone: "Europe/Riga",
        languages: "lv,ru,lt",
        created_at: null,
        updated_at: null,
    },
    {
        id: "116",
        name: "Lebanon",
        lat: "33.854721",
        lng: "35.862285",
        iso2: "LB",
        iso3: "LBN",
        phone_code: "961",
        timezone: "Asia/Beirut",
        languages: "ar-LB,fr-LB,en,hy",
        created_at: null,
        updated_at: null,
    },
    {
        id: "117",
        name: "Lesotho",
        lat: "-29.609988",
        lng: "28.233608",
        iso2: "LS",
        iso3: "LSO",
        phone_code: "266",
        timezone: "Africa/Johannesburg",
        languages: "en-LS,st,zu,xh",
        created_at: null,
        updated_at: null,
    },
    {
        id: "118",
        name: "Liberia",
        lat: "6.428055",
        lng: "-9.429499",
        iso2: "LR",
        iso3: "LBR",
        phone_code: "231",
        timezone: "Africa/Monrovia",
        languages: "en-LR",
        created_at: null,
        updated_at: null,
    },
    {
        id: "119",
        name: "Libya",
        lat: "26.3351",
        lng: "17.228331",
        iso2: "LY",
        iso3: "LBY",
        phone_code: "218",
        timezone: "Africa/Tripoli",
        languages: "ar-LY,it,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "120",
        name: "Liechtenstein",
        lat: "47.166",
        lng: "9.555373",
        iso2: "LI",
        iso3: "LIE",
        phone_code: "423",
        timezone: "Europe/Zurich",
        languages: "de-LI",
        created_at: null,
        updated_at: null,
    },
    {
        id: "121",
        name: "Lithuania",
        lat: "55.169438",
        lng: "23.881275",
        iso2: "LT",
        iso3: "LTU",
        phone_code: "370",
        timezone: "Europe/Vilnius",
        languages: "lt,ru,pl",
        created_at: null,
        updated_at: null,
    },
    {
        id: "122",
        name: "Luxembourg",
        lat: "49.815273",
        lng: "6.129583",
        iso2: "LU",
        iso3: "LUX",
        phone_code: "352",
        timezone: "Europe/Luxembourg",
        languages: "lb,de-LU,fr-LU",
        created_at: null,
        updated_at: null,
    },
    {
        id: "123",
        name: "Macau",
        lat: "22.198745",
        lng: "113.543873",
        iso2: "MO",
        iso3: "MAC",
        phone_code: "853",
        timezone: "Asia/Macau",
        languages: "zh,zh-MO,pt",
        created_at: null,
        updated_at: null,
    },
    {
        id: "124",
        name: "Macedonia",
        lat: "41.608635",
        lng: "21.745275",
        iso2: "MK",
        iso3: "MKD",
        phone_code: "389",
        timezone: "Europe/Belgrade",
        languages: "mk,sq,tr,rmm,sr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "125",
        name: "Madagascar",
        lat: "-18.766947",
        lng: "46.869107",
        iso2: "MG",
        iso3: "MDG",
        phone_code: "261",
        timezone: "Indian/Antananarivo",
        languages: "fr-MG,mg",
        created_at: null,
        updated_at: null,
    },
    {
        id: "126",
        name: "Malawi",
        lat: "-13.254308",
        lng: "34.301525",
        iso2: "MW",
        iso3: "MWI",
        phone_code: "265",
        timezone: "Africa/Maputo",
        languages: "ny,yao,tum,swk",
        created_at: null,
        updated_at: null,
    },
    {
        id: "127",
        name: "Malaysia",
        lat: "4.210484",
        lng: "101.975766",
        iso2: "MY",
        iso3: "MYS",
        phone_code: "60",
        timezone: "Asia/Kuala_Lumpur",
        languages: "ms-MY,en,zh,ta,te,ml,pa,th",
        created_at: null,
        updated_at: null,
    },
    {
        id: "128",
        name: "Maldives",
        lat: "3.202778",
        lng: "73.22068",
        iso2: "MV",
        iso3: "MDV",
        phone_code: "960",
        timezone: "Indian/Maldives",
        languages: "dv,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "129",
        name: "Mali",
        lat: "17.570692",
        lng: "-3.996166",
        iso2: "ML",
        iso3: "MLI",
        phone_code: "223",
        timezone: "Africa/Abidjan",
        languages: "fr-ML,bm",
        created_at: null,
        updated_at: null,
    },
    {
        id: "130",
        name: "Malta",
        lat: "35.937496",
        lng: "14.375416",
        iso2: "MT",
        iso3: "MLT",
        phone_code: "356",
        timezone: "Europe/Malta",
        languages: "mt,en-MT",
        created_at: null,
        updated_at: null,
    },
    {
        id: "131",
        name: "Marshall Islands",
        lat: "7.131474",
        lng: "171.184478",
        iso2: "MH",
        iso3: "MHL",
        phone_code: "692",
        timezone: "Pacific/Majuro",
        languages: "mh,en-MH",
        created_at: null,
        updated_at: null,
    },
    {
        id: "132",
        name: "Mauritania",
        lat: "21.00789",
        lng: "-10.940835",
        iso2: "MR",
        iso3: "MRT",
        phone_code: "222",
        timezone: "Africa/Abidjan",
        languages: "ar-MR,fuc,snk,fr,mey,wo",
        created_at: null,
        updated_at: null,
    },
    {
        id: "133",
        name: "Mauritius",
        lat: "-20.348404",
        lng: "57.552152",
        iso2: "MU",
        iso3: "MUS",
        phone_code: "230",
        timezone: "Indian/Mauritius",
        languages: "en-MU,bho,fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "134",
        name: "Mayotte",
        lat: "-12.8275",
        lng: "45.166244",
        iso2: "YT",
        iso3: "MYT",
        phone_code: "262",
        timezone: "Indian/Mayotte",
        languages: "fr-YT",
        created_at: null,
        updated_at: null,
    },
    {
        id: "135",
        name: "Mexico",
        lat: "23.634501",
        lng: "-102.552784",
        iso2: "MX",
        iso3: "MEX",
        phone_code: "52",
        timezone: "America/Mexico_City",
        languages: "es-MX",
        created_at: null,
        updated_at: null,
    },
    {
        id: "136",
        name: "Micronesia",
        lat: "7.425554",
        lng: "150.550812",
        iso2: "FM",
        iso3: "FSM",
        phone_code: "691",
        timezone: "Pacific/Pohnpei",
        languages: "en-FM,chk,pon,yap,kos,uli,woe,nkr,kpg",
        created_at: null,
        updated_at: null,
    },
    {
        id: "137",
        name: "Moldova",
        lat: "47.411631",
        lng: "28.369885",
        iso2: "MD",
        iso3: "MDA",
        phone_code: "373",
        timezone: "Europe/Chisinau",
        languages: "ro,ru,gag,tr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "138",
        name: "Monaco",
        lat: "43.750298",
        lng: "7.412841",
        iso2: "MC",
        iso3: "MCO",
        phone_code: "377",
        timezone: "Europe/Monaco",
        languages: "fr-MC,en,it",
        created_at: null,
        updated_at: null,
    },
    {
        id: "139",
        name: "Mongolia",
        lat: "46.862496",
        lng: "103.846656",
        iso2: "MN",
        iso3: "MNG",
        phone_code: "976",
        timezone: "Asia/Ulaanbaatar",
        languages: "mn,ru",
        created_at: null,
        updated_at: null,
    },
    {
        id: "140",
        name: "Montenegro",
        lat: "42.708678",
        lng: "19.37439",
        iso2: "ME",
        iso3: "MNE",
        phone_code: "382",
        timezone: "Europe/Belgrade",
        languages: "sr,hu,bs,sq,hr,rom",
        created_at: null,
        updated_at: null,
    },
    {
        id: "141",
        name: "Montserrat",
        lat: "16.742498",
        lng: "-62.187366",
        iso2: "MS",
        iso3: "MSR",
        phone_code: "1-664",
        timezone: "America/Port_of_Spain",
        languages: "en-MS",
        created_at: null,
        updated_at: null,
    },
    {
        id: "142",
        name: "Morocco",
        lat: "31.791702",
        lng: "-7.09262",
        iso2: "MA",
        iso3: "MAR",
        phone_code: "212",
        timezone: "Africa/Casablanca",
        languages: "ar-MA,fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "143",
        name: "Mozambique",
        lat: "-18.665695",
        lng: "35.529562",
        iso2: "MZ",
        iso3: "MOZ",
        phone_code: "258",
        timezone: "Africa/Maputo",
        languages: "pt-MZ,vmw",
        created_at: null,
        updated_at: null,
    },
    {
        id: "144",
        name: "Myanmar",
        lat: "21.913965",
        lng: "95.956223",
        iso2: "MM",
        iso3: "MMR",
        phone_code: "95",
        timezone: "Asia/Rangoon",
        languages: "my",
        created_at: null,
        updated_at: null,
    },
    {
        id: "145",
        name: "Namibia",
        lat: "-22.95764",
        lng: "18.49041",
        iso2: "NA",
        iso3: "NAM",
        phone_code: "264",
        timezone: "Africa/Windhoek",
        languages: "en-NA,af,de,hz,naq",
        created_at: null,
        updated_at: null,
    },
    {
        id: "146",
        name: "Nauru",
        lat: "-0.522778",
        lng: "166.931503",
        iso2: "NR",
        iso3: "NRU",
        phone_code: "674",
        timezone: "Pacific/Nauru",
        languages: "na,en-NR",
        created_at: null,
        updated_at: null,
    },
    {
        id: "147",
        name: "Nepal",
        lat: "28.394857",
        lng: "84.124008",
        iso2: "NP",
        iso3: "NPL",
        phone_code: "977",
        timezone: "Asia/Kathmandu",
        languages: "ne,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "148",
        name: "Netherlands",
        lat: "52.132633",
        lng: "5.291266",
        iso2: "NL",
        iso3: "NLD",
        phone_code: "31",
        timezone: "Europe/Amsterdam",
        languages: "nl-NL,fy-NL",
        created_at: null,
        updated_at: null,
    },
    {
        id: "149",
        name: "Netherlands Antilles",
        lat: "12.226079",
        lng: "-69.060087",
        iso2: "AN",
        iso3: "ANT",
        phone_code: "599",
        timezone: "America/Curacao",
        languages: "nl-AN,en,es",
        created_at: null,
        updated_at: null,
    },
    {
        id: "150",
        name: "New Caledonia",
        lat: "-20.904305",
        lng: "165.618042",
        iso2: "NC",
        iso3: "NCL",
        phone_code: "687",
        timezone: "Pacific/Noumea",
        languages: "fr-NC",
        created_at: null,
        updated_at: null,
    },
    {
        id: "151",
        name: "New Zealand",
        lat: "-40.900557",
        lng: "174.885971",
        iso2: "NZ",
        iso3: "NZL",
        phone_code: "64",
        timezone: "Pacific/Auckland",
        languages: "en-NZ,mi",
        created_at: null,
        updated_at: null,
    },
    {
        id: "152",
        name: "Nicaragua",
        lat: "12.865416",
        lng: "-85.207229",
        iso2: "NI",
        iso3: "NIC",
        phone_code: "505",
        timezone: "America/Managua",
        languages: "es-NI,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "153",
        name: "Niger",
        lat: "17.607789",
        lng: "8.081666",
        iso2: "NE",
        iso3: "NER",
        phone_code: "227",
        timezone: "Africa/Lagos",
        languages: "fr-NE,ha,kr,dje",
        created_at: null,
        updated_at: null,
    },
    {
        id: "154",
        name: "Nigeria",
        lat: "9.081999",
        lng: "8.675277",
        iso2: "NG",
        iso3: "NGA",
        phone_code: "234",
        timezone: "Africa/Lagos",
        languages: "en-NG,ha,yo,ig,ff",
        created_at: null,
        updated_at: null,
    },
    {
        id: "155",
        name: "Niue",
        lat: "-19.054445",
        lng: "-169.867233",
        iso2: "NU",
        iso3: "NIU",
        phone_code: "683",
        timezone: "Pacific/Niue",
        languages: "niu,en-NU",
        created_at: null,
        updated_at: null,
    },
    {
        id: "156",
        name: "North Korea",
        lat: "40.339852",
        lng: "127.510093",
        iso2: "KP",
        iso3: "PRK",
        phone_code: "850",
        timezone: "Asia/Pyongyang",
        languages: "ko-KP",
        created_at: null,
        updated_at: null,
    },
    {
        id: "157",
        name: "Northern Mariana Islands",
        lat: "17.33083",
        lng: "145.38469",
        iso2: "MP",
        iso3: "MNP",
        phone_code: "1-670",
        timezone: "Pacific/Saipan",
        languages: "fil,tl,zh,ch-MP,en-MP",
        created_at: null,
        updated_at: null,
    },
    {
        id: "158",
        name: "Norway",
        lat: "60.472024",
        lng: "8.468946",
        iso2: "NO",
        iso3: "NOR",
        phone_code: "47",
        timezone: "Europe/Oslo",
        languages: "no,nb,nn,se,fi",
        created_at: null,
        updated_at: null,
    },
    {
        id: "159",
        name: "Oman",
        lat: "21.512583",
        lng: "55.923255",
        iso2: "OM",
        iso3: "OMN",
        phone_code: "968",
        timezone: "Asia/Muscat",
        languages: "ar-OM,en,bal,ur",
        created_at: null,
        updated_at: null,
    },
    {
        id: "160",
        name: "Pakistan",
        lat: "30.375321",
        lng: "69.345116",
        iso2: "PK",
        iso3: "PAK",
        phone_code: "92",
        timezone: "Asia/Karachi",
        languages: "ur-PK,en-PK,pa,sd,ps,brh",
        created_at: null,
        updated_at: null,
    },
    {
        id: "161",
        name: "Palau",
        lat: "7.51498",
        lng: "134.58252",
        iso2: "PW",
        iso3: "PLW",
        phone_code: "680",
        timezone: "Pacific/Palau",
        languages: "pau,sov,en-PW,tox,ja,fil,zh",
        created_at: null,
        updated_at: null,
    },
    {
        id: "162",
        name: "Palestine",
        lat: "31.952162",
        lng: "35.233154",
        iso2: "PS",
        iso3: "PSE",
        phone_code: "970",
        timezone: "Asia/Hebron",
        languages: "ar-PS",
        created_at: null,
        updated_at: null,
    },
    {
        id: "163",
        name: "Panama",
        lat: "8.537981",
        lng: "-80.782127",
        iso2: "PA",
        iso3: "PAN",
        phone_code: "507",
        timezone: "America/Panama",
        languages: "es-PA,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "164",
        name: "Papua New Guinea",
        lat: "-6.314993",
        lng: "143.95555",
        iso2: "PG",
        iso3: "PNG",
        phone_code: "675",
        timezone: "Pacific/Port_Moresby",
        languages: "en-PG,ho,meu,tpi",
        created_at: null,
        updated_at: null,
    },
    {
        id: "165",
        name: "Paraguay",
        lat: "-23.442503",
        lng: "-58.443832",
        iso2: "PY",
        iso3: "PRY",
        phone_code: "595",
        timezone: "America/Asuncion",
        languages: "es-PY,gn",
        created_at: null,
        updated_at: null,
    },
    {
        id: "166",
        name: "Peru",
        lat: "-9.189967",
        lng: "-75.015152",
        iso2: "PE",
        iso3: "PER",
        phone_code: "51",
        timezone: "America/Lima",
        languages: "es-PE,qu,ay",
        created_at: null,
        updated_at: null,
    },
    {
        id: "167",
        name: "Philippines",
        lat: "12.879721",
        lng: "121.774017",
        iso2: "PH",
        iso3: "PHL",
        phone_code: "63",
        timezone: "Asia/Manila",
        languages: "tl,en-PH,fil",
        created_at: null,
        updated_at: null,
    },
    {
        id: "168",
        name: "Pitcairn",
        lat: "-24.703615",
        lng: "-127.439308",
        iso2: "PN",
        iso3: "PCN",
        phone_code: "64",
        timezone: "Pacific/Pitcairn",
        languages: "en-PN",
        created_at: null,
        updated_at: null,
    },
    {
        id: "169",
        name: "Poland",
        lat: "51.919438",
        lng: "19.145136",
        iso2: "PL",
        iso3: "POL",
        phone_code: "48",
        timezone: "Europe/Warsaw",
        languages: "pl",
        created_at: null,
        updated_at: null,
    },
    {
        id: "170",
        name: "Portugal",
        lat: "39.399872",
        lng: "-8.224454",
        iso2: "PT",
        iso3: "PRT",
        phone_code: "351",
        timezone: "Europe/Lisbon",
        languages: "pt-PT,mwl",
        created_at: null,
        updated_at: null,
    },
    {
        id: "171",
        name: "Puerto Rico",
        lat: "18.220833",
        lng: "-66.590149",
        iso2: "PR",
        iso3: "PRI",
        phone_code: "1-787, 1-939",
        timezone: "America/Puerto_Rico",
        languages: "en-PR,es-PR",
        created_at: null,
        updated_at: null,
    },
    {
        id: "172",
        name: "Qatar",
        lat: "25.354826",
        lng: "51.183884",
        iso2: "QA",
        iso3: "QAT",
        phone_code: "974",
        timezone: "Asia/Qatar",
        languages: "ar-QA,es",
        created_at: null,
        updated_at: null,
    },
    {
        id: "173",
        name: "Republic of the Congo",
        lat: "-0.228021",
        lng: "15.827659",
        iso2: "CG",
        iso3: "COG",
        phone_code: "242",
        timezone: "Africa/Lagos",
        languages: "fr-CG,kg,ln-CG",
        created_at: null,
        updated_at: null,
    },
    {
        id: "174",
        name: "Reunion",
        lat: "-21.115141",
        lng: "55.536384",
        iso2: "RE",
        iso3: "REU",
        phone_code: "262",
        timezone: "Indian/Reunion",
        languages: "fr-RE",
        created_at: null,
        updated_at: null,
    },
    {
        id: "175",
        name: "Romania",
        lat: "45.943161",
        lng: "24.96676",
        iso2: "RO",
        iso3: "ROU",
        phone_code: "40",
        timezone: "Europe/Bucharest",
        languages: "ro,hu,rom",
        created_at: null,
        updated_at: null,
    },
    {
        id: "176",
        name: "Russia",
        lat: "61.52401",
        lng: "105.318756",
        iso2: "RU",
        iso3: "RUS",
        phone_code: "7",
        timezone: "Europe/Moscow",
        languages:
            "ru,tt,xal,cau,ady,kv,ce,tyv,cv,udm,tut,mns,bua,myv,mdf,chm,ba,inh,tut,kbd,krc,ava,sah,nog",
        created_at: null,
        updated_at: null,
    },
    {
        id: "177",
        name: "Rwanda",
        lat: "-1.940278",
        lng: "29.873888",
        iso2: "RW",
        iso3: "RWA",
        phone_code: "250",
        timezone: "Africa/Maputo",
        languages: "rw,en-RW,fr-RW,sw",
        created_at: null,
        updated_at: null,
    },
    {
        id: "178",
        name: "Saint Barthelemy",
        lat: "",
        lng: "",
        iso2: "BL",
        iso3: "BLM",
        phone_code: "590",
        timezone: "America/Port_of_Spain",
        languages: "fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "179",
        name: "Saint Helena",
        lat: "-24.143474",
        lng: "-10.030696",
        iso2: "SH",
        iso3: "SHN",
        phone_code: "290",
        timezone: "Africa/Abidjan",
        languages: "en-SH",
        created_at: null,
        updated_at: null,
    },
    {
        id: "180",
        name: "Saint Kitts and Nevis",
        lat: "17.357822",
        lng: "-62.782998",
        iso2: "KN",
        iso3: "KNA",
        phone_code: "1-869",
        timezone: "America/Port_of_Spain",
        languages: "en-KN",
        created_at: null,
        updated_at: null,
    },
    {
        id: "181",
        name: "Saint Lucia",
        lat: "13.909444",
        lng: "-60.978893",
        iso2: "LC",
        iso3: "LCA",
        phone_code: "1-758",
        timezone: "America/Port_of_Spain",
        languages: "en-LC",
        created_at: null,
        updated_at: null,
    },
    {
        id: "182",
        name: "Saint Martin",
        lat: "",
        lng: "",
        iso2: "MF",
        iso3: "MAF",
        phone_code: "590",
        timezone: "America/Port_of_Spain",
        languages: "fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "183",
        name: "Saint Pierre and Miquelon",
        lat: "46.941936",
        lng: "-56.27111",
        iso2: "PM",
        iso3: "SPM",
        phone_code: "508",
        timezone: "America/Miquelon",
        languages: "fr-PM",
        created_at: null,
        updated_at: null,
    },
    {
        id: "184",
        name: "Saint Vincent and the Grenadines",
        lat: "12.984305",
        lng: "-61.287228",
        iso2: "VC",
        iso3: "VCT",
        phone_code: "1-784",
        timezone: "America/Port_of_Spain",
        languages: "en-VC,fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "185",
        name: "Samoa",
        lat: "-13.759029",
        lng: "-172.104629",
        iso2: "WS",
        iso3: "WSM",
        phone_code: "685",
        timezone: "Pacific/Apia",
        languages: "sm,en-WS",
        created_at: null,
        updated_at: null,
    },
    {
        id: "186",
        name: "San Marino",
        lat: "43.94236",
        lng: "12.457777",
        iso2: "SM",
        iso3: "SMR",
        phone_code: "378",
        timezone: "Europe/Rome",
        languages: "it-SM",
        created_at: null,
        updated_at: null,
    },
    {
        id: "187",
        name: "Sao Tome and Principe",
        lat: "0.18636",
        lng: "6.613081",
        iso2: "ST",
        iso3: "STP",
        phone_code: "239",
        timezone: "Africa/Abidjan",
        languages: "pt-ST",
        created_at: null,
        updated_at: null,
    },
    {
        id: "188",
        name: "Saudi Arabia",
        lat: "23.885942",
        lng: "45.079162",
        iso2: "SA",
        iso3: "SAU",
        phone_code: "966",
        timezone: "Asia/Riyadh",
        languages: "ar-SA",
        created_at: null,
        updated_at: null,
    },
    {
        id: "189",
        name: "Senegal",
        lat: "14.497401",
        lng: "-14.452362",
        iso2: "SN",
        iso3: "SEN",
        phone_code: "221",
        timezone: "Africa/Abidjan",
        languages: "fr-SN,wo,fuc,mnk",
        created_at: null,
        updated_at: null,
    },
    {
        id: "190",
        name: "Serbia",
        lat: "44.016521",
        lng: "21.005859",
        iso2: "RS",
        iso3: "SRB",
        phone_code: "381",
        timezone: "Europe/Belgrade",
        languages: "sr,hu,bs,rom",
        created_at: null,
        updated_at: null,
    },
    {
        id: "191",
        name: "Seychelles",
        lat: "-4.679574",
        lng: "55.491977",
        iso2: "SC",
        iso3: "SYC",
        phone_code: "248",
        timezone: "Indian/Mahe",
        languages: "en-SC,fr-SC",
        created_at: null,
        updated_at: null,
    },
    {
        id: "192",
        name: "Sierra Leone",
        lat: "8.460555",
        lng: "-11.779889",
        iso2: "SL",
        iso3: "SLE",
        phone_code: "232",
        timezone: "Africa/Abidjan",
        languages: "en-SL,men,tem",
        created_at: null,
        updated_at: null,
    },
    {
        id: "193",
        name: "Singapore",
        lat: "1.352083",
        lng: "103.819836",
        iso2: "SG",
        iso3: "SGP",
        phone_code: "65",
        timezone: "Asia/Singapore",
        languages: "cmn,en-SG,ms-SG,ta-SG,zh-SG",
        created_at: null,
        updated_at: null,
    },
    {
        id: "194",
        name: "Sint Maarten",
        lat: "18.075277",
        lng: "-63.060001",
        iso2: "SX",
        iso3: "SXM",
        phone_code: "1-721",
        timezone: "America/Curacao",
        languages: "nl,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "195",
        name: "Slovakia",
        lat: "48.669026",
        lng: "19.699024",
        iso2: "SK",
        iso3: "SVK",
        phone_code: "421",
        timezone: "Europe/Prague",
        languages: "sk,hu",
        created_at: null,
        updated_at: null,
    },
    {
        id: "196",
        name: "Slovenia",
        lat: "46.151241",
        lng: "14.995463",
        iso2: "SI",
        iso3: "SVN",
        phone_code: "386",
        timezone: "Europe/Belgrade",
        languages: "sl,sh",
        created_at: null,
        updated_at: null,
    },
    {
        id: "197",
        name: "Solomon Islands",
        lat: "-9.64571",
        lng: "160.156194",
        iso2: "SB",
        iso3: "SLB",
        phone_code: "677",
        timezone: "Pacific/Guadalcanal",
        languages: "en-SB,tpi",
        created_at: null,
        updated_at: null,
    },
    {
        id: "198",
        name: "Somalia",
        lat: "5.152149",
        lng: "46.199616",
        iso2: "SO",
        iso3: "SOM",
        phone_code: "252",
        timezone: "Africa/Mogadishu",
        languages: "so-SO,ar-SO,it,en-SO",
        created_at: null,
        updated_at: null,
    },
    {
        id: "199",
        name: "South Africa",
        lat: "-30.559482",
        lng: "22.937506",
        iso2: "ZA",
        iso3: "ZAF",
        phone_code: "27",
        timezone: "Africa/Johannesburg",
        languages: "zu,xh,af,nso,en-ZA,tn,st,ts,ss,ve,nr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "200",
        name: "South Korea",
        lat: "35.907757",
        lng: "127.766922",
        iso2: "KR",
        iso3: "KOR",
        phone_code: "82",
        timezone: "Asia/Seoul",
        languages: "ko-KR,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "201",
        name: "South Sudan",
        lat: "",
        lng: "",
        iso2: "SS",
        iso3: "SSD",
        phone_code: "211",
        timezone: "Africa/Khartoum",
        languages: "en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "202",
        name: "Spain",
        lat: "40.463667",
        lng: "-3.74922",
        iso2: "ES",
        iso3: "ESP",
        phone_code: "34",
        timezone: "Europe/Madrid",
        languages: "es-ES,ca,gl,eu,oc",
        created_at: null,
        updated_at: null,
    },
    {
        id: "203",
        name: "Sri Lanka",
        lat: "7.873054",
        lng: "80.771797",
        iso2: "LK",
        iso3: "LKA",
        phone_code: "94",
        timezone: "Asia/Colombo",
        languages: "si,ta,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "204",
        name: "Sudan",
        lat: "12.862807",
        lng: "30.217636",
        iso2: "SD",
        iso3: "SDN",
        phone_code: "249",
        timezone: "Africa/Khartoum",
        languages: "ar-SD,en,fia",
        created_at: null,
        updated_at: null,
    },
    {
        id: "205",
        name: "Suriname",
        lat: "3.919305",
        lng: "-56.027783",
        iso2: "SR",
        iso3: "SUR",
        phone_code: "597",
        timezone: "America/Paramaribo",
        languages: "nl-SR,en,srn,hns,jv",
        created_at: null,
        updated_at: null,
    },
    {
        id: "206",
        name: "Svalbard and Jan Mayen",
        lat: "77.553604",
        lng: "23.670272",
        iso2: "SJ",
        iso3: "SJM",
        phone_code: "47",
        timezone: "Europe/Oslo",
        languages: "no,ru",
        created_at: null,
        updated_at: null,
    },
    {
        id: "207",
        name: "Swaziland",
        lat: "-26.522503",
        lng: "31.465866",
        iso2: "SZ",
        iso3: "SWZ",
        phone_code: "268",
        timezone: "Africa/Johannesburg",
        languages: "en-SZ,ss-SZ",
        created_at: null,
        updated_at: null,
    },
    {
        id: "208",
        name: "Sweden",
        lat: "60.128161",
        lng: "18.643501",
        iso2: "SE",
        iso3: "SWE",
        phone_code: "46",
        timezone: "Europe/Stockholm",
        languages: "sv-SE,se,sma,fi-SE",
        created_at: null,
        updated_at: null,
    },
    {
        id: "209",
        name: "Switzerland",
        lat: "46.818188",
        lng: "8.227512",
        iso2: "CH",
        iso3: "CHE",
        phone_code: "41",
        timezone: "Europe/Zurich",
        languages: "de-CH,fr-CH,it-CH,rm",
        created_at: null,
        updated_at: null,
    },
    {
        id: "210",
        name: "Syria",
        lat: "34.802075",
        lng: "38.996815",
        iso2: "SY",
        iso3: "SYR",
        phone_code: "963",
        timezone: "Asia/Damascus",
        languages: "ar-SY,ku,hy,arc,fr,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "211",
        name: "Taiwan",
        lat: "23.69781",
        lng: "120.960515",
        iso2: "TW",
        iso3: "TWN",
        phone_code: "886",
        timezone: "Asia/Taipei",
        languages: "zh-TW,zh,nan,hak",
        created_at: null,
        updated_at: null,
    },
    {
        id: "212",
        name: "Tajikistan",
        lat: "38.861034",
        lng: "71.276093",
        iso2: "TJ",
        iso3: "TJK",
        phone_code: "992",
        timezone: "Asia/Dushanbe",
        languages: "tg,ru",
        created_at: null,
        updated_at: null,
    },
    {
        id: "213",
        name: "Tanzania",
        lat: "-6.369028",
        lng: "34.888822",
        iso2: "TZ",
        iso3: "TZA",
        phone_code: "255",
        timezone: "Africa/Dar_es_Salaam",
        languages: "sw-TZ,en,ar",
        created_at: null,
        updated_at: null,
    },
    {
        id: "214",
        name: "Thailand",
        lat: "15.870032",
        lng: "100.992541",
        iso2: "TH",
        iso3: "THA",
        phone_code: "66",
        timezone: "Asia/Bangkok",
        languages: "th,en",
        created_at: null,
        updated_at: null,
    },
    {
        id: "215",
        name: "Togo",
        lat: "8.619543",
        lng: "0.824782",
        iso2: "TG",
        iso3: "TGO",
        phone_code: "228",
        timezone: "Africa/Abidjan",
        languages: "fr-TG,ee,hna,kbp,dag,ha",
        created_at: null,
        updated_at: null,
    },
    {
        id: "216",
        name: "Tokelau",
        lat: "-8.967363",
        lng: "-171.855881",
        iso2: "TK",
        iso3: "TKL",
        phone_code: "690",
        timezone: "Pacific/Fakaofo",
        languages: "tkl,en-TK",
        created_at: null,
        updated_at: null,
    },
    {
        id: "217",
        name: "Tonga",
        lat: "-21.178986",
        lng: "-175.198242",
        iso2: "TO",
        iso3: "TON",
        phone_code: "676",
        timezone: "Pacific/Tongatapu",
        languages: "to,en-TO",
        created_at: null,
        updated_at: null,
    },
    {
        id: "218",
        name: "Trinidad and Tobago",
        lat: "10.691803",
        lng: "-61.222503",
        iso2: "TT",
        iso3: "TTO",
        phone_code: "1-868",
        timezone: "America/Port_of_Spain",
        languages: "en-TT,hns,fr,es,zh",
        created_at: null,
        updated_at: null,
    },
    {
        id: "219",
        name: "Tunisia",
        lat: "33.886917",
        lng: "9.537499",
        iso2: "TN",
        iso3: "TUN",
        phone_code: "216",
        timezone: "Africa/Tunis",
        languages: "ar-TN,fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "220",
        name: "Turkey",
        lat: "38.963745",
        lng: "35.243322",
        iso2: "TR",
        iso3: "TUR",
        phone_code: "90",
        timezone: "Europe/Istanbul",
        languages: "tr-TR,ku,diq,az,av",
        created_at: null,
        updated_at: null,
    },
    {
        id: "221",
        name: "Turkmenistan",
        lat: "38.969719",
        lng: "59.556278",
        iso2: "TM",
        iso3: "TKM",
        phone_code: "993",
        timezone: "Asia/Ashgabat",
        languages: "tk,ru,uz",
        created_at: null,
        updated_at: null,
    },
    {
        id: "222",
        name: "Turks and Caicos Islands",
        lat: "21.694025",
        lng: "-71.797928",
        iso2: "TC",
        iso3: "TCA",
        phone_code: "1-649",
        timezone: "America/Grand_Turk",
        languages: "en-TC",
        created_at: null,
        updated_at: null,
    },
    {
        id: "223",
        name: "Tuvalu",
        lat: "-7.109535",
        lng: "177.64933",
        iso2: "TV",
        iso3: "TUV",
        phone_code: "688",
        timezone: "Pacific/Funafuti",
        languages: "tvl,en,sm,gil",
        created_at: null,
        updated_at: null,
    },
    {
        id: "224",
        name: "U.S. Virgin Islands",
        lat: "18.335765",
        lng: "-64.896335",
        iso2: "VI",
        iso3: "VIR",
        phone_code: "1-340",
        timezone: "America/Port_of_Spain",
        languages: "en-VI",
        created_at: null,
        updated_at: null,
    },
    {
        id: "225",
        name: "Uganda",
        lat: "1.373333",
        lng: "32.290275",
        iso2: "UG",
        iso3: "UGA",
        phone_code: "256",
        timezone: "Africa/Kampala",
        languages: "en-UG,lg,sw,ar",
        created_at: null,
        updated_at: null,
    },
    {
        id: "226",
        name: "Ukraine",
        lat: "48.379433",
        lng: "31.16558",
        iso2: "UA",
        iso3: "UKR",
        phone_code: "380",
        timezone: "Europe/Kiev",
        languages: "uk,ru-UA,rom,pl,hu",
        created_at: null,
        updated_at: null,
    },
    {
        id: "227",
        name: "United Arab Emirates",
        lat: "23.424076",
        lng: "53.847818",
        iso2: "AE",
        iso3: "ARE",
        phone_code: "971",
        timezone: "Asia/Dubai",
        languages: "ar-AE,fa,en,hi,ur",
        created_at: null,
        updated_at: null,
    },
    {
        id: "228",
        name: "United Kingdom",
        lat: "55.378051",
        lng: "-3.435973",
        iso2: "GB",
        iso3: "GBR",
        phone_code: "44",
        timezone: "Europe/London",
        languages: "en-GB,cy-GB,gd",
        created_at: null,
        updated_at: null,
    },
    {
        id: "229",
        name: "United States",
        lat: "37.09024",
        lng: "-95.712891",
        iso2: "US",
        iso3: "USA",
        phone_code: "1",
        timezone: "America/New_York",
        languages: "en-US,es-US,haw,fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "230",
        name: "Uruguay",
        lat: "-32.522779",
        lng: "-55.765835",
        iso2: "UY",
        iso3: "URY",
        phone_code: "598",
        timezone: "America/Montevideo",
        languages: "es-UY",
        created_at: null,
        updated_at: null,
    },
    {
        id: "231",
        name: "Uzbekistan",
        lat: "41.377491",
        lng: "64.585262",
        iso2: "UZ",
        iso3: "UZB",
        phone_code: "998",
        timezone: "Asia/Tashkent",
        languages: "uz,ru,tg",
        created_at: null,
        updated_at: null,
    },
    {
        id: "232",
        name: "Vanuatu",
        lat: "-15.376706",
        lng: "166.959158",
        iso2: "VU",
        iso3: "VUT",
        phone_code: "678",
        timezone: "Pacific/Efate",
        languages: "bi,en-VU,fr-VU",
        created_at: null,
        updated_at: null,
    },
    {
        id: "233",
        name: "Vatican",
        lat: "41.902916",
        lng: "12.453389",
        iso2: "VA",
        iso3: "VAT",
        phone_code: "379",
        timezone: "Europe/Rome",
        languages: "la,it,fr",
        created_at: null,
        updated_at: null,
    },
    {
        id: "234",
        name: "Venezuela",
        lat: "6.42375",
        lng: "-66.58973",
        iso2: "VE",
        iso3: "VEN",
        phone_code: "58",
        timezone: "America/Caracas",
        languages: "es-VE",
        created_at: null,
        updated_at: null,
    },
    {
        id: "235",
        name: "Vietnam",
        lat: "14.058324",
        lng: "108.277199",
        iso2: "VN",
        iso3: "VNM",
        phone_code: "84",
        timezone: "Asia/Ho_Chi_Minh",
        languages: "vi,en,fr,zh,km",
        created_at: null,
        updated_at: null,
    },
    {
        id: "236",
        name: "Wallis and Futuna",
        lat: "-13.768752",
        lng: "-177.156097",
        iso2: "WF",
        iso3: "WLF",
        phone_code: "681",
        timezone: "Pacific/Wallis",
        languages: "wls,fud,fr-WF",
        created_at: null,
        updated_at: null,
    },
    {
        id: "237",
        name: "Western Sahara",
        lat: "24.215527",
        lng: "-12.885834",
        iso2: "EH",
        iso3: "ESH",
        phone_code: "212",
        timezone: "Africa/El_Aaiun",
        languages: "ar,mey",
        created_at: null,
        updated_at: null,
    },
    {
        id: "238",
        name: "Yemen",
        lat: "15.552727",
        lng: "48.516388",
        iso2: "YE",
        iso3: "YEM",
        phone_code: "967",
        timezone: "Asia/Aden",
        languages: "ar-YE",
        created_at: null,
        updated_at: null,
    },
    {
        id: "239",
        name: "Zambia",
        lat: "-13.133897",
        lng: "27.849332",
        iso2: "ZM",
        iso3: "ZMB",
        phone_code: "260",
        timezone: "Africa/Maputo",
        languages: "en-ZM,bem,loz,lun,lue,ny,toi",
        created_at: null,
        updated_at: null,
    },
    {
        id: "240",
        name: "Zimbabwe",
        lat: "-19.015438",
        lng: "29.154857",
        iso2: "ZW",
        iso3: "ZWE",
        phone_code: "263",
        timezone: "Africa/Maputo",
        languages: "en-ZW,sn,nr,nd",
        created_at: null,
        updated_at: null,
    },
];

export const getCountryFlag = (iso2) => {
    if (iso2 == "AL") {
        return AF;
    } else if (iso2 == "AL") {
        return AL;
    } else if (iso2 == "DZ") {
        return DZ;
    } else if (iso2 == "AS") {
        return AS;
    } else if (iso2 == "AD") {
        return AD;
    } else if (iso2 == "AO") {
        return AO;
    } else if (iso2 == "AI") {
        return AI;
    } else if (iso2 == "AQ") {
        return AQ;
    } else if (iso2 == "AG") {
        return AG;
    } else if (iso2 == "AR") {
        return AR;
    } else if (iso2 == "AM") {
        return AM;
    } else if (iso2 == "AW") {
        return AW;
    } else if (iso2 == "AU") {
        return AU;
    } else if (iso2 == "AT") {
        return AT;
    } else if (iso2 == "AZ") {
        return AZ;
    } else if (iso2 == "BS") {
        return BS;
    } else if (iso2 == "BH") {
        return BH;
    } else if (iso2 == "BD") {
        return BD;
    } else if (iso2 == "BB") {
        return BB;
    } else if (iso2 == "BY") {
        return BY;
    } else if (iso2 == "BE") {
        return BE;
    } else if (iso2 == "BZ") {
        return BZ;
    } else if (iso2 == "BJ") {
        return BJ;
    } else if (iso2 == "BM") {
        return BM;
    } else if (iso2 == "BT") {
        return BT;
    } else if (iso2 == "BO") {
        return BO;
    } else if (iso2 == "BA") {
        return BA;
    } else if (iso2 == "BW") {
        return BW;
    } else if (iso2 == "BR") {
        return BR;
    } else if (iso2 == "IO") {
        return IO;
    } else if (iso2 == "VG") {
        return VG;
    } else if (iso2 == "BN") {
        return BN;
    } else if (iso2 == "BG") {
        return BG;
    } else if (iso2 == "BF") {
        return BF;
    } else if (iso2 == "BI") {
        return BI;
    } else if (iso2 == "KH") {
        return KH;
    } else if (iso2 == "CM") {
        return CM;
    } else if (iso2 == "CA") {
        return CA;
    } else if (iso2 == "CV") {
        return CV;
    } else if (iso2 == "KY") {
        return KY;
    } else if (iso2 == "CF") {
        return CF;
    } else if (iso2 == "TD") {
        return TD;
    } else if (iso2 == "CL") {
        return CL;
    } else if (iso2 == "CN") {
        return CN;
    } else if (iso2 == "CX") {
        return CX;
    } else if (iso2 == "CC") {
        return CC;
    } else if (iso2 == "CO") {
        return CO;
    } else if (iso2 == "KM") {
        return KM;
    } else if (iso2 == "CK") {
        return CK;
    } else if (iso2 == "CR") {
        return CR;
    } else if (iso2 == "HR") {
        return HR;
    } else if (iso2 == "CU") {
        return CU;
    } else if (iso2 == "CW") {
        return CW;
    } else if (iso2 == "CY") {
        return CY;
    } else if (iso2 == "CZ") {
        return CZ;
    } else if (iso2 == "CD") {
        return CD;
    } else if (iso2 == "DK") {
        return DK;
    } else if (iso2 == "DJ") {
        return DJ;
    } else if (iso2 == "DM") {
        return DM;
    } else if (iso2 == "DO") {
        return DO;
    } else if (iso2 == "TL") {
        return TL;
    } else if (iso2 == "EC") {
        return EC;
    } else if (iso2 == "EG") {
        return EG;
    } else if (iso2 == "SV") {
        return SV;
    } else if (iso2 == "GQ") {
        return GQ;
    } else if (iso2 == "ER") {
        return ER;
    } else if (iso2 == "EE") {
        return EE;
    } else if (iso2 == "ET") {
        return ET;
    } else if (iso2 == "FK") {
        return FK;
    } else if (iso2 == "FO") {
        return FO;
    } else if (iso2 == "FJ") {
        return FJ;
    } else if (iso2 == "FI") {
        return FI;
    } else if (iso2 == "FR") {
        return FR;
    } else if (iso2 == "PF") {
        return PF;
    } else if (iso2 == "GA") {
        return GA;
    } else if (iso2 == "GM") {
        return GM;
    } else if (iso2 == "GE") {
        return GE;
    } else if (iso2 == "DE") {
        return DE;
    } else if (iso2 == "GH") {
        return GH;
    } else if (iso2 == "GI") {
        return GI;
    } else if (iso2 == "GR") {
        return GR;
    } else if (iso2 == "GL") {
        return GL;
    } else if (iso2 == "GD") {
        return GD;
    } else if (iso2 == "GU") {
        return GU;
    } else if (iso2 == "GT") {
        return GT;
    } else if (iso2 == "GG") {
        return GG;
    } else if (iso2 == "GN") {
        return GN;
    } else if (iso2 == "GW") {
        return GW;
    } else if (iso2 == "GY") {
        return GY;
    } else if (iso2 == "HT") {
        return HT;
    } else if (iso2 == "HN") {
        return HN;
    } else if (iso2 == "HK") {
        return HK;
    } else if (iso2 == "HU") {
        return HU;
    } else if (iso2 == "IS") {
        return IS;
    } else if (iso2 == "IN") {
        return IN;
    } else if (iso2 == "ID") {
        return ID;
    } else if (iso2 == "IR") {
        return IR;
    } else if (iso2 == "IQ") {
        return IQ;
    } else if (iso2 == "IE") {
        return IE;
    } else if (iso2 == "IM") {
        return IM;
    } else if (iso2 == "IL") {
        return IL;
    } else if (iso2 == "IT") {
        return IT;
    } else if (iso2 == "CI") {
        return CI;
    } else if (iso2 == "JM") {
        return JM;
    } else if (iso2 == "JP") {
        return JP;
    } else if (iso2 == "JE") {
        return JE;
    } else if (iso2 == "JO") {
        return JO;
    } else if (iso2 == "KZ") {
        return KZ;
    } else if (iso2 == "KE") {
        return KE;
    } else if (iso2 == "KI") {
        return KI;
    } else if (iso2 == "XK") {
        return XK;
    } else if (iso2 == "KW") {
        return KW;
    } else if (iso2 == "KG") {
        return KG;
    } else if (iso2 == "LA") {
        return LA;
    } else if (iso2 == "LV") {
        return LV;
    } else if (iso2 == "LB") {
        return LB;
    } else if (iso2 == "LS") {
        return LS;
    } else if (iso2 == "LR") {
        return LR;
    } else if (iso2 == "LY") {
        return LY;
    } else if (iso2 == "LI") {
        return LI;
    } else if (iso2 == "LT") {
        return LT;
    } else if (iso2 == "LU") {
        return LU;
    } else if (iso2 == "MO") {
        return MO;
    } else if (iso2 == "MK") {
        return MK;
    } else if (iso2 == "MG") {
        return MG;
    } else if (iso2 == "MW") {
        return MW;
    } else if (iso2 == "MY") {
        return MY;
    } else if (iso2 == "MV") {
        return MV;
    } else if (iso2 == "ML") {
        return ML;
    } else if (iso2 == "MT") {
        return MT;
    } else if (iso2 == "MH") {
        return MH;
    } else if (iso2 == "MR") {
        return MR;
    } else if (iso2 == "MU") {
        return MU;
    } else if (iso2 == "YT") {
        return YT;
    } else if (iso2 == "MX") {
        return MX;
    } else if (iso2 == "FM") {
        return FM;
    } else if (iso2 == "MD") {
        return MD;
    } else if (iso2 == "MC") {
        return MC;
    } else if (iso2 == "MN") {
        return MN;
    } else if (iso2 == "ME") {
        return ME;
    } else if (iso2 == "MS") {
        return MS;
    } else if (iso2 == "MA") {
        return MA;
    } else if (iso2 == "MZ") {
        return MZ;
    } else if (iso2 == "MM") {
        return MM;
    } else if (iso2 == "NA") {
        return NA;
    } else if (iso2 == "NR") {
        return NR;
    } else if (iso2 == "NP") {
        return NP;
    } else if (iso2 == "NL") {
        return NL;
    } else if (iso2 == "NC") {
        return NC;
    } else if (iso2 == "NZ") {
        return NZ;
    } else if (iso2 == "NI") {
        return NI;
    } else if (iso2 == "NE") {
        return NE;
    } else if (iso2 == "NG") {
        return NG;
    } else if (iso2 == "NU") {
        return NU;
    } else if (iso2 == "KP") {
        return KP;
    } else if (iso2 == "MP") {
        return MP;
    } else if (iso2 == "NO") {
        return NO;
    } else if (iso2 == "OM") {
        return OM;
    } else if (iso2 == "PK") {
        return PK;
    } else if (iso2 == "PW") {
        return PW;
    } else if (iso2 == "PS") {
        return PS;
    } else if (iso2 == "PA") {
        return PA;
    } else if (iso2 == "PG") {
        return PG;
    } else if (iso2 == "PY") {
        return PY;
    } else if (iso2 == "PE") {
        return PE;
    } else if (iso2 == "PH") {
        return PH;
    } else if (iso2 == "PN") {
        return PN;
    } else if (iso2 == "PL") {
        return PL;
    } else if (iso2 == "PT") {
        return PT;
    } else if (iso2 == "PR") {
        return PR;
    } else if (iso2 == "QA") {
        return QA;
    } else if (iso2 == "CG") {
        return CG;
    } else if (iso2 == "RE") {
        return RE;
    } else if (iso2 == "RO") {
        return RO;
    } else if (iso2 == "RU") {
        return RU;
    } else if (iso2 == "RW") {
        return RW;
    } else if (iso2 == "BL") {
        return BL;
    } else if (iso2 == "SH") {
        return SH;
    } else if (iso2 == "KN") {
        return KN;
    } else if (iso2 == "LC") {
        return LC;
    } else if (iso2 == "MF") {
        return MF;
    } else if (iso2 == "PM") {
        return PM;
    } else if (iso2 == "VC") {
        return VC;
    } else if (iso2 == "WS") {
        return WS;
    } else if (iso2 == "SM") {
        return SM;
    } else if (iso2 == "ST") {
        return ST;
    } else if (iso2 == "SA") {
        return SA;
    } else if (iso2 == "SN") {
        return SN;
    } else if (iso2 == "RS") {
        return RS;
    } else if (iso2 == "SC") {
        return SC;
    } else if (iso2 == "SL") {
        return SL;
    } else if (iso2 == "SG") {
        return SG;
    } else if (iso2 == "SX") {
        return SX;
    } else if (iso2 == "SK") {
        return SK;
    } else if (iso2 == "SI") {
        return SI;
    } else if (iso2 == "SB") {
        return SB;
    } else if (iso2 == "SO") {
        return SO;
    } else if (iso2 == "ZA") {
        return ZA;
    } else if (iso2 == "KR") {
        return KR;
    } else if (iso2 == "SS") {
        return SS;
    } else if (iso2 == "ES") {
        return ES;
    } else if (iso2 == "LK") {
        return LK;
    } else if (iso2 == "SD") {
        return SD;
    } else if (iso2 == "SR") {
        return SR;
    } else if (iso2 == "SJ") {
        return SJ;
    } else if (iso2 == "SZ") {
        return SZ;
    } else if (iso2 == "SE") {
        return SE;
    } else if (iso2 == "CH") {
        return CH;
    } else if (iso2 == "SY") {
        return SY;
    } else if (iso2 == "TW") {
        return TW;
    } else if (iso2 == "TJ") {
        return TJ;
    } else if (iso2 == "TZ") {
        return TZ;
    } else if (iso2 == "TH") {
        return TH;
    } else if (iso2 == "TG") {
        return TG;
    } else if (iso2 == "TK") {
        return TK;
    } else if (iso2 == "TO") {
        return TO;
    } else if (iso2 == "TT") {
        return TT;
    } else if (iso2 == "TN") {
        return TN;
    } else if (iso2 == "TR") {
        return TR;
    } else if (iso2 == "TM") {
        return TM;
    } else if (iso2 == "TC") {
        return TC;
    } else if (iso2 == "TV") {
        return TV;
    } else if (iso2 == "VI") {
        return VI;
    } else if (iso2 == "UG") {
        return UG;
    } else if (iso2 == "UA") {
        return UA;
    } else if (iso2 == "AE") {
        return AE;
    } else if (iso2 == "GB") {
        return GB;
    } else if (iso2 == "US") {
        return US;
    } else if (iso2 == "UY") {
        return UY;
    } else if (iso2 == "UZ") {
        return UZ;
    } else if (iso2 == "VU") {
        return VU;
    } else if (iso2 == "VA") {
        return VA;
    } else if (iso2 == "VE") {
        return VE;
    } else if (iso2 == "VN") {
        return VN;
    } else if (iso2 == "WF") {
        return WF;
    } else if (iso2 == "EH") {
        return EH;
    } else if (iso2 == "YE") {
        return YE;
    } else if (iso2 == "ZM") {
        return ZM;
    } else if (iso2 == "ZW") {
        return ZW;
    }
};

export const getCountry = (countries, country_id) => {
    let country;
    country_id &&
        countries?.map(
            (item) =>
                item &&
                Object.entries(item)?.map(([key, val]) =>
                    key == "id" && val == country_id ? (country = item) : null
                )
        );

    return country;
};

export const getCountryByAreaCode = (countries, areaCode) => {
    let country;
    areaCode &&
        countries?.map((item) =>
            item?.phone_code == areaCode ? (country = item) : null
        );

    return country;
};

export const removeDomElement = (element) => {
    element && element?.parentNode && element?.parentNode?.removeChild(element);
};

export const stringToJSON = (string) => {
    return JSON.parse(string);
};

export const getExtension = (str) => {
    return str.slice(str.lastIndexOf(".") + 1);
};
export const getFileName = (url) => {
    return url.slice(url.lastIndexOf("/") + 1);
};

export const getFileNameFromCaption = (theCaption: any) => {
    if (theCaption && theCaption != "") {
        if (_.isJSON(theCaption)) {
            const caption = JSON.parse(theCaption);
            return caption.filename;
        }
    }
};

export const captionToJson = (theCaption: any) => {
    if (theCaption && theCaption != "") {
        if (_.isJSON(theCaption)) {
            const caption = JSON.parse(theCaption);
            return caption;
        }
    }
};
export const getFileType = (file) => {
    if (file?.type?.startsWith("video/")) {
        return "video";
    } else if (file?.type?.startsWith("audio/")) {
        return "audio";
    } else if (file?.type?.startsWith("image/")) {
        return "image";
    } else {
        return "document";
    }
};

export const getPageLinksPayload = (path, filter) => {
    if (path) {
        const link = path?.substr(path?.indexOf("page="));
        if (link) {
            const link_arr = link.split("=");
            if (filter != "") {
                return {
                    page: link_arr[1],
                    search: filter,
                };
            } else {
                return {
                    page: link_arr[1],
                };
            }
        }
    }
};

export const getMessageLinksPayload = (path) => {
    if (path) {
        const link = path?.substr(path?.indexOf("?page="));
        if (link) {
            return link;
        }
    }
};

export const getPhoneNumberInfo = (phoneNumber) => {
    const thePhoneWithPlusSign = phoneNumber?.startsWith("+")
        ? phoneNumber
        : `+${phoneNumber}`;

    let phoneNumberInfo;
    try {
        const parsedPhoneNumber =
            parsePhoneNumberWithError(thePhoneWithPlusSign);
        phoneNumberInfo = {
            phoneInfo: {
                country: parsedPhoneNumber.country,
                areaCode: parsedPhoneNumber.countryCallingCode,
                nationalNumber: parsedPhoneNumber.nationalNumber,
                number: parsedPhoneNumber.number,
            },
        };
    } catch (error) {
        if (error instanceof ParseError) {
            // Not a phone number, non-existent country, etc.
            phoneNumberInfo = {
                error: error.message,
            };
        } else {
            phoneNumberInfo = {
                error: error,
            };
        }
    }
    return phoneNumberInfo;
};

export const getComponentsContent = (templateComponents) => {
    // components: [
    //     {
    //         type: "",
    //         text: "",
    //         format: "",
    //         parameters: [{ text: "" }],
    //     },
    // ],
    let components = [];
    templateComponents?.map((component) => {
        if (
            component.type?.toUpperCase() == "HEADER" &&
            component.format?.toUpperCase() == "TEXT"
        ) {
            let temp_component = {};
            temp_component["type"] = "HEADER";
            temp_component["format"] = "TEXT";
            temp_component["text"] = component?.text || "";
            component.example?.header_text?.map((value, key) => {
                temp_component["text"] = temp_component["text"].replace(
                    `{{${key + 1}}}`,
                    value
                );
            });
            temp_component && components.push(temp_component);
        }
        if (component.type?.toUpperCase() == "BODY") {
            let temp_component = {};
            temp_component["type"] = "BODY";
            temp_component["text"] = component?.text;
            component.example?.body_text[0]?.map((value, key) => {
                temp_component["text"] = temp_component["text"].replace(
                    `{{${key + 1}}}`,
                    value
                );
            });
            temp_component && components.push(temp_component);
        }
        if (component.type?.toUpperCase() == "FOOTER") {
            //
            let temp_component = {};
            temp_component["type"] = "FOOTER";
            temp_component["text"] = component?.text;
            component.example?.footer_text?.map((value, key) => {
                temp_component["text"] = temp_component["text"].replace(
                    `{{${key + 1}}}`,
                    value
                );
            });
            temp_component && components.push(temp_component);
        }
        if (component.type?.toUpperCase() == "BUTTONS") {
            //
            let temp_component = {};
            // temp_component["type"] = "BUTTONS";
            // previewButtons && (temp_component["parameters"] = previewButtons);
            temp_component && components.push(component);
        }
    });

    return components;
};

export const getTemplateTypeFromChannel = (channel) => {
    if (channel) {
        switch (channel?.name) {
            case "WhatsApp Cloud API":
            case "Facebook Messenger":
                return "whatsapp_template";
                break;
            default:
                break;
        }
    }
};

export const getNameInitials = (firstName, lastName) => {
    let initials = "";
    if (firstName && firstName != "") {
        initials = firstName?.charAt(0);
        if (lastName && lastName != "") {
            initials = firstName?.charAt(0) + lastName?.charAt(0);
        }
    }

    return initials;
};

export const changeFontSize = (element, fontSize) => {
    element.style.fontSize = fontSize + "px";
    for (var i = 0; i < element.children.length; i++) {
        changeFontSize(element.children[i], fontSize);
    }
};

// export const getContactUUIDFromPath = () => {
//     let result = null;
//     chrome.tabs.query({ active: true }, (tabs) => {
//         const tab = tabs[0];
//         const uuid = tab.url?.split("/")?.pop() || tab.url?.split("/")?.pop();
//         result = isValidUUID(uuid) ? uuid : null;
//     });
//     return result;
// };

// export const getFireberryContact = (contactsList, uuid) => {
//     return contactsList?.find((contact) => contact?.id == uuid);
// };

// export const getFireberryIDFromContact = (
//     contact,
//     firebery_contactID_field
// ) => {
//     let fireberry_id = null;
//     contact?.fields?.map((field) =>
//         field.slug == firebery_contactID_field
//             ? (fireberry_id = field.value)
//             : null
//     );
//     return fireberry_id;
// };

export const getFireberryUUIDFromURL = (tab_url) => {
    if (tab_url) {
        const uuid = tab_url?.split("/")?.pop() || tab_url?.split("/")?.pop();
        if (uuid && uuid.includes("?")) {
            const matches = tab_url.match(/([A-F\d-]+)\?/i);
            return matches && matches[1] ? matches[1] : null;
        } else {
            return uuid;
        }
    }
};

export const getNameFromMessageWhenReplying = (
    message: any,
    currentContact: any
) => {
    let name: any = null;
    const user = getLoggedinUser();

    if (message?.sender?.id) {
        user.id == message?.sender?.id
            ? (name = "You")
            : (name = message?.sender?.name);
    } else {
        name = currentContact?.firstName;
    }
    return name;
};

//
export const fontSizes = {
    big: 14,
    normal: 12,
    small: 10,
};

export const contactFields = [
    {
        name: "Assignee",
        field: "$assignee.name",
    },
    {
        name: "Email",
        field: "$contact.email",
    },
    {
        name: "First Name",
        field: "$contact.firstName",
    },
    {
        name: "Blocked",
        field: "$contact.isBlocked",
    },
    {
        name: "Language",
        field: "$contact.language",
    },
    {
        name: "Last Name",
        field: "$contact.lastName",
    },
    {
        name: "Life Cycle",
        field: "$contact.lifeCycleId",
    },
    {
        name: "Phone",
        field: "$contact.phone",
    },
    {
        name: "Status",
        field: "$contact.status",
    },
    {
        name: "Tags",
        field: "$contact.tags",
    },
];

export const setContact = (contact, countries) => {
    const country = getCountry(countries, contact?.country_id);
    const temp = {
        id: contact.id,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        email: contact.email,
        assignedTo: contact.assignedTo,
        tags: contact.tags,
        lifecycleId: contact.lifecycleId,
        language: contact.language,
        profilePicture: contact.profilePicture,
        lastInteractedChannel: contact.lastInteractedChannel,
        status: contact.status,
        statusChangedAt: contact.statusChangedAt,
        isBlocked: contact.isBlocked,
        flag: country?.iso2,
    };

    return contact && temp;
};

export const blobToFile = (theBlob, fileName) => {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    //theBlob.type = "audio/mpeg";

    return theBlob;
};

export const changeAudioMimeType = (theBlob) => {
    let blob = theBlob;
    blob.type = "audio/mpeg";

    return blob;
};

export const fileToBlob = async (file: any) =>
    new Blob([new Uint8Array(await file.arrayBuffer())], { type: file.type });

//import { FFmpeg } from '@ffmpeg/ffmpeg';
//import * as FFmpeg from '@ffmpeg/ffmpeg';
import { FFmpeg } from "@ffmpeg/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { timeStamp } from "console";
export const convertWebmToMp3 = async (webmBlob: any) => {
    // const ffmpeg = createFFmpeg({ log: false });
    // await ffmpeg.load();

    // const inputName = "input.webm";
    // const outputName = "output.mp3";

    // ffmpeg.FS(
    //     "writeFile",
    //     inputName,
    //     await fetch(webmBlob).then((res) => res.arrayBuffer())
    // );

    // await ffmpeg.run("-i", inputName, outputName);

    // const outputData = ffmpeg.FS("readFile", outputName);
    // const outputBlob = new Blob([outputData.buffer], { type: "audio/mp3" });

    const ffmpeg = new FFmpeg();

    await ffmpeg.load();

    await ffmpeg.writeFile("sound.mp3", await fetchFile(webmBlob));
    await ffmpeg.exec(["-i", "sound.mp3", "output.mp3"]);
    const data: any = await ffmpeg.readFile("output.mp3");

    const outputBlob = new Blob([data.buffer], { type: "audio/mp3" });

    return outputBlob;
};

export const isJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

import moment from "moment-timezone";
export const handleMessageTimeMeta = (timeStamp, language): any => {
    const txt = moment.unix(timeStamp).local().fromNow();
    if (language == "IL_he") {
        if (txt == "a few seconds ago") {
            return txt;
        } else {
            const val = txt.split(" ");
            const t_val = val[0] == "a" || val[0] == "an" ? "1" : val[0];
            return {
                val_0: t_val,
                val_1: val[1],
                val_2: val[2],
            };
        }
    } else {
        return txt;
    }
};
