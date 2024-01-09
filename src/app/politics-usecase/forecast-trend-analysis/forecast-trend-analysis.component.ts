import { DatabotService } from './../../core/databot.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
declare var $: any;

@Component({
  selector: 'app-forecast-trend-analysis',
  templateUrl: './forecast-trend-analysis.component.html',
  styleUrls: ['./forecast-trend-analysis.component.css']
})
export class ForecastTrendAnalysisComponent implements OnInit {

  boothjsondata: any;
  assemblyjsondata:any;
  assemblyboothdata:any;
  district: any = [];
  assembly: any = [];
  totalMale: any = [];
  assemblynew: any = [];

  assemblyData: any;

  boothNumber: any = [];

  allRecord: any = [];

  assemblyobj: any = [];
  malecount: any = [];
  maxmalearrayvalue: any;
  male_latest = [];
  districtname: any;
  female_latest: any = [];
  other_latest: any = [];
  hindu_latest: any = [];
  muslim_latest: any = [];
  Christian_latest: any = [];
  greatelacks_latest: any = [];
  max_5000_latest: any = [];

  max_25000_latest: any = [];
  max_10000_latest: any = [];
  less_10000_latest: any = [];

  ageabove_60: any = [];
  abeabove_45: any = [];
  ageabove_30: any = [];
  ageabove_20: any = [];
  ageabove_18: any = [];

  agriculture_latest: any = [];
  jobs_latest: any = [];
  infrastructure_latest: any = [];
  law_latest: any = [];
  governance_latest: any = []
  distdefaultname: any;
  asseblydefaultname: any;
  constructor(public http: HttpClient,public databotService: DatabotService) { }

  ngOnInit() {
      this.loadDistricts();
      this.loadAssemblies();
      this.loadBooths();
  }

  loadDistricts(){
    this.databotService.loadPoliticsTrendDistrict().subscribe(data => {
      this.boothjsondata = data;
      var index:any;
      for (index in this.boothjsondata) {

          if (this.district.indexOf(this.boothjsondata[index].District) < 0) {
            this.district.push(this.boothjsondata[index].District);
            this.assembly.push(this.boothjsondata[index].District);
            this.assemblyobj.push(this.boothjsondata[index]);
        }
    }
    this.filterRecord(this.assemblyobj);
  });
}

  loadAssemblies(){
    this.databotService.loadPoliticsTrendAssembly().subscribe(data => {
      this.assemblyjsondata = data;
    });
  }

  loadBooths(){
    this.databotService.loadPoliticsTrendBooth().subscribe(data => {
      this.assemblyboothdata = data;
    });
  }




  changeDistrict(district) {
    this.assembly = [];
    this.assemblynew = [];
    this.assemblyobj = [];
    this.male_latest = [];
    this.female_latest = [];
    this.other_latest = [];
    this.hindu_latest = [];
    this.muslim_latest = [];
    this.Christian_latest = [];
    this.greatelacks_latest = [];
    this.max_5000_latest = [];

    this.max_25000_latest = [];
    this.max_10000_latest = [];
    this.less_10000_latest = [];

    this.ageabove_60 = [];
    this.abeabove_45 = [];
    this.ageabove_30 = [];
    this.ageabove_20 = [];
    this.ageabove_18 = [];

    this.agriculture_latest = [];
    this.jobs_latest = [];
    this.infrastructure_latest = [];
    this.law_latest = [];
    this.governance_latest = []

    this.districtname = district.currentTarget.value;
    var index: any;
    for (index in this.assemblyjsondata) {
      if (this.assemblyjsondata[index].District == this.districtname) {
        if (this.assemblynew.indexOf(this.assemblyjsondata[index].Assembly) < 0) {
          this.assemblynew.push(this.assemblyjsondata[index].Assembly);
          this.assembly.push(this.assemblyjsondata[index].Assembly);
          this.assemblyobj.push(this.assemblyjsondata[index])



        }
      }

    }
    this.filterRecord(this.assemblyobj);

  }

  changeAssembly(district) {
    this.assembly = [];
    this.assemblyobj = [];
    this.male_latest = [];
    this.female_latest = [];
    this.other_latest = [];
    this.hindu_latest = [];
    this.muslim_latest = [];
    this.Christian_latest = [];
    this.greatelacks_latest = [];
    this.max_5000_latest = [];

    this.max_25000_latest = [];
    this.max_10000_latest = [];
    this.less_10000_latest = [];

    this.ageabove_60 = [];
    this.abeabove_45 = [];
    this.ageabove_30 = [];
    this.ageabove_20 = [];
    this.ageabove_18 = [];

    this.agriculture_latest = [];
    this.jobs_latest = [];
    this.infrastructure_latest = [];
    this.law_latest = [];
    this.governance_latest = []

    var assemblyname = district.currentTarget.value;
    var index: any;

    for (index in this.assemblyboothdata) {
      if (this.assemblyboothdata[index].Assembly == assemblyname) {
        if (this.assemblynew.indexOf(this.assemblyboothdata[index]['Booth Number']) < 0) {
          this.assembly.push(this.assemblyboothdata[index]['Booth Number']);
          this.assemblyobj.push(this.assemblyboothdata[index]);

        }
      }

    }
    this.filterRecord(this.assemblyobj);

  }


  filterRecord(assemblyobj) {
    var index;
    for (index in this.assemblyobj) {
      this.maxMale(assemblyobj[index].Male, assemblyobj[index].Parties);
      this.maxFemale(assemblyobj[index].Female, assemblyobj[index].Parties);
      this.maxOthers(assemblyobj[index].Other, assemblyobj[index].Parties);
      this.maxHindu(assemblyobj[index].Hindu, assemblyobj[index].Parties);
      this.maxMuslim(assemblyobj[index].Muslim, assemblyobj[index].Parties);
      this.maxChristian(assemblyobj[index].Christian, assemblyobj[index].Parties);
      this.maxgreater100000(assemblyobj[index]['>100000'], assemblyobj[index].Parties);
      this.max_5000(assemblyobj[index]['>50000'], assemblyobj[index].Parties);
      this.max_25000(assemblyobj[index]['>25000'], assemblyobj[index].Parties);
      this.max_10000(assemblyobj[index]['>10000'], assemblyobj[index].Parties);
      this.less_10000(assemblyobj[index]['10000'], assemblyobj[index].Parties);
      this.age_60(assemblyobj[index]['Above 60'], assemblyobj[index].Parties);
      this.age_45(assemblyobj[index]['46-60'], assemblyobj[index].Parties);
      this.age_30(assemblyobj[index]['31-45'], assemblyobj[index].Parties);
      this.age_20(assemblyobj[index]['31-45'], assemblyobj[index].Parties);
      this.age_18(assemblyobj[index]['31-45'], assemblyobj[index].Parties);
      this.maxAgriculture(assemblyobj[index].Agriculture, assemblyobj[index].Parties);
      this.maxJobs(assemblyobj[index].Jobs, assemblyobj[index].Parties);
      this.maxInfrastructure(assemblyobj[index].Infrastructure, assemblyobj[index].Parties);
      this.maxLaw(assemblyobj[index]['Law & Order'], assemblyobj[index].Parties);
      this.maxGovernmance(assemblyobj[index].Governance, assemblyobj[index].Parties);
    }

  }

  maxMale(male, party) {
    var $this = this;
    var maleCount = Math.max.apply(null, male);
    var partyNmae = party[male.indexOf(Math.max.apply(null, male))];
    this.male_latest.push({ "male": maleCount, "partyname": partyNmae });


  }

  maxFemale(female, party) {
    var $this = this;
    var femaleCount = Math.max.apply(null, female);
    var partyNmae = party[female.indexOf(Math.max.apply(null, female))];
    this.female_latest.push({ "female": femaleCount, "partyname": partyNmae });
    console.log(this.female_latest)

  }

  maxOthers(other, party) {
    var $this = this;
    var othercount = Math.max.apply(null, other);
    var partyNmae = party[other.indexOf(Math.max.apply(null, other))];
    this.other_latest.push({ "other": othercount, "Party": partyNmae });


  }

  maxHindu(hindu, party) {
    var $this = this;
    var hindicount = Math.max.apply(null, hindu);
    var partyNmae = party[hindu.indexOf(Math.max.apply(null, hindu))];
    this.hindu_latest.push({ "hindu": hindicount, "Party": partyNmae });

  }

  maxMuslim(muslim, party) {
    var $this = this;
    var muslimcount = Math.max.apply(null, muslim);
    var partyNmae = party[muslim.indexOf(Math.max.apply(null, muslim))];
    this.muslim_latest.push({ "muslim": muslimcount, "Party": partyNmae });

  }

  maxChristian(Christian, party) {
    var $this = this;
    var christiancount = Math.max.apply(null, Christian);
    var partyNmae = party[Christian.indexOf(Math.max.apply(null, Christian))];
    this.Christian_latest.push({ "christian": christiancount, "Party": partyNmae });

  }

  maxgreater100000(value, party) {
    var $this = this;
    var greatelacksvalue = Math.max.apply(null, value);
    var partyNmae = party[value.indexOf(Math.max.apply(null, value))];
    this.greatelacks_latest.push({ "greatevalue": greatelacksvalue, "Party": partyNmae });
  }

  max_5000(max5000, party) {
    var $this = this;
    var max5000value = Math.max.apply(null, max5000);
    var partyNmae = party[max5000.indexOf(Math.max.apply(null, max5000))];
    this.max_5000_latest.push({ ">50000": max5000value, "Party": partyNmae });
  }

  max_25000(max25000, party) {
    var $this = this;
    var max25000value = Math.max.apply(null, max25000);
    var partyNmae = party[max25000.indexOf(Math.max.apply(null, max25000))];
    this.max_25000_latest.push({ ">25000": max25000value, "Party": partyNmae });
  }

  max_10000(max10000, party) {
    var $this = this;
    var max10000value = Math.max.apply(null, max10000);
    var partyNmae = party[max10000.indexOf(Math.max.apply(null, max10000))];
    this.max_10000_latest.push({ ">10000": max10000value, "Party": partyNmae });
  }

  less_10000(less10000, party) {
    var $this = this;
    var less10000value = Math.max.apply(null, less10000);
    var partyNmae = party[less10000.indexOf(Math.max.apply(null, less10000))];
    this.less_10000_latest.push({ "lesten": less10000value, "Party": partyNmae });

  }

  age_60(age, party) {
    var $this = this;
    var agevalue = Math.max.apply(null, age);
    var partyNmae = party[age.indexOf(Math.max.apply(null, age))];
    this.ageabove_60.push({ "Above 60": agevalue, "Party": partyNmae });
  }

  age_45(age, party) {
    var $this = this;
    var agevalue = Math.max.apply(null, age);
    var partyNmae = party[age.indexOf(Math.max.apply(null, age))];
    this.abeabove_45.push({ "46-60": agevalue, "Party": partyNmae });
  }
  age_30(age, party) {
    var $this = this;
    var agevalue = Math.max.apply(null, age);
    var partyNmae = party[age.indexOf(Math.max.apply(null, age))];
    this.ageabove_30.push({ "31-45": agevalue, "Party": partyNmae });
  }
  age_20(age, party) {
    var $this = this;
    var agevalue = Math.max.apply(null, age);
    var partyNmae = party[age.indexOf(Math.max.apply(null, age))];
    this.ageabove_20.push({ "21-30": agevalue, "Party": partyNmae });
  }
  age_18(age, party) {
    var $this = this;
    var agevalue = Math.max.apply(null, age);
    var partyNmae = party[age.indexOf(Math.max.apply(null, age))];
    this.ageabove_18.push({ "18-20": agevalue, "Party": partyNmae });
  }

  maxAgriculture(incomebency, party) {
    var $this = this;
    var agriculturevalue = Math.max.apply(null, incomebency);
    var partyNmae = party[incomebency.indexOf(Math.max.apply(null, incomebency))];
    this.agriculture_latest.push({ "Agriculture": agriculturevalue, "Party": partyNmae });

  }

  maxJobs(incomebency, party) {
    var $this = this;
    var agriculturevalue = Math.max.apply(null, incomebency);
    var partyNmae = party[incomebency.indexOf(Math.max.apply(null, incomebency))];
    this.jobs_latest.push({ "Jobs": agriculturevalue, "Party": partyNmae });

  }
  maxInfrastructure(incomebency, party) {
    var $this = this;
    var agriculturevalue = Math.max.apply(null, incomebency);
    var partyNmae = party[incomebency.indexOf(Math.max.apply(null, incomebency))];
    this.infrastructure_latest.push({ "Infrastructure": agriculturevalue, "Party": partyNmae });

  }
  maxLaw(incomebency, party) {
    var $this = this;
    var agriculturevalue = Math.max.apply(null, incomebency);
    var partyNmae = party[incomebency.indexOf(Math.max.apply(null, incomebency))];
    this.law_latest.push({ "Law & Order": agriculturevalue, "Party": partyNmae });

  }
  maxGovernmance(incomebency, party) {
    var $this = this;
    var agriculturevalue = Math.max.apply(null, incomebency);
    var partyNmae = party[incomebency.indexOf(Math.max.apply(null, incomebency))];
    this.governance_latest.push({ "governance": agriculturevalue, "Party": partyNmae });

  }


}

