import React from "react";
import ReactDOM from 'react-dom';

import Decimal from "break_infinity.js";

import "@blueprintjs/core/lib/css/blueprint.css"

import { Producer } from './components/Producer';

import { Classes, Colors, H1, Icon, H3, Button, Navbar, Alert, Intent } from "@blueprintjs/core";
import { Rules } from "./rules";
import { PickNamePopup } from "./components/PickNamePopup";
import { NameGen } from "./namegen/NameGen";

const bug = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bug" className="svg-inline--fa fa-bug fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="28px" height="28px"><path fill="currentColor" d="M511.988 288.9c-.478 17.43-15.217 31.1-32.653 31.1H424v16c0 21.864-4.882 42.584-13.6 61.145l60.228 60.228c12.496 12.497 12.496 32.758 0 45.255-12.498 12.497-32.759 12.496-45.256 0l-54.736-54.736C345.886 467.965 314.351 480 280 480V236c0-6.627-5.373-12-12-12h-24c-6.627 0-12 5.373-12 12v244c-34.351 0-65.886-12.035-90.636-32.108l-54.736 54.736c-12.498 12.497-32.759 12.496-45.256 0-12.496-12.497-12.496-32.758 0-45.255l60.228-60.228C92.882 378.584 88 357.864 88 336v-16H32.666C15.23 320 .491 306.33.013 288.9-.484 270.816 14.028 256 32 256h56v-58.745l-46.628-46.628c-12.496-12.497-12.496-32.758 0-45.255 12.498-12.497 32.758-12.497 45.256 0L141.255 160h229.489l54.627-54.627c12.498-12.497 32.758-12.497 45.256 0 12.496 12.497 12.496 32.758 0 45.255L424 197.255V256h56c17.972 0 32.484 14.816 31.988 32.9zM257 0c-61.856 0-112 50.144-112 112h224C369 50.144 318.856 0 257 0z"></path></svg> 
const nuke = <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="radiation-alt" className="svg-inline--fa fa-radiation-alt fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="16px" height="16px"><path fill="currentColor" d="M312 256h79.1c9.2 0 16.9-7.7 16-16.8-4.6-43.6-27-81.8-59.5-107.8-7.6-6.1-18.8-4.5-24 3.8L281.9 202c18 11.2 30.1 31.2 30.1 54zm-97.8 54.1L172.4 377c-4.9 7.8-2.4 18.4 5.8 22.5 21.1 10.4 44.7 16.5 69.8 16.5s48.7-6.1 69.9-16.5c8.2-4.1 10.6-14.7 5.8-22.5l-41.8-66.9c-9.8 6.2-21.4 9.9-33.8 9.9s-24.1-3.7-33.9-9.9zM104.9 256H184c0-22.8 12.1-42.8 30.2-54.1l-41.7-66.8c-5.2-8.3-16.4-9.9-24-3.8-32.6 26-54.9 64.2-59.5 107.8-1.1 9.2 6.7 16.9 15.9 16.9zM248 504c137 0 248-111 248-248S385 8 248 8 0 119 0 256s111 248 248 248zm0-432c101.5 0 184 82.5 184 184s-82.5 184-184 184S64 357.5 64 256 146.5 72 248 72zm0 216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32z"></path></svg>;
 interface GameState{
   bugs:Decimal;
   commits:Decimal;
   forks:{level:number, user:string, feature:string}[];
   projectName:string;
   changeName:boolean;

   nuking:boolean;

 }

class App extends React.Component {
  private oldDate = Date.now();

  state:GameState = {
    bugs: new Decimal(5),
    commits: new Decimal(5),
    forks:[{level:0,user:NameGen.getUserName(5,12), feature:NameGen.getFeatureName()}],
    projectName:"",
    changeName:false,
    nuking:false,
  };

  componentDidMount() {
    const savedata = localStorage.getItem("savedata");
    let saveObject:any = {
      bugs: new Decimal(5),
      commits: new Decimal(5),
      forks:[{level:0,user:NameGen.getUserName(5,12), feature:NameGen.getFeatureName()}],
      projectName:"",
      changeName:false,
      nuking:false,
    };
    if (savedata)
    {
      saveObject = JSON.parse(savedata);
      saveObject.bugs = Decimal.fromString(saveObject.bugs);
      saveObject.commits = Decimal.fromString(saveObject.commits);
    }
    this.setState(saveObject)
    requestAnimationFrame(this.updateBank.bind(this));
  }

  updateBank(){
    const dt:number = (Date.now() - this.oldDate)/1000
    this.oldDate = Date.now();
    const oldBugs = this.state.bugs;
    const oldCommits = this.state.commits;
    let newBugs = new Decimal(0);
    for (let i = 0; i < this.state.forks.length; i++) {
      const fork = this.state.forks[i];
      const earnings = Rules.earnings(fork.level,i,dt);
      newBugs = newBugs.add(earnings);
    }

    //calculate bonuses!...
    for (let i = 0; i < this.state.forks.length; i++) {
      const fork = this.state.forks[i];
      newBugs = newBugs.multiply(1 + Math.floor(fork.level/10)/100); //1% per 10 levels.
    }

    this.setState({bugs:oldBugs.add(newBugs), commits:oldCommits.add(newBugs)});
    setTimeout(this.updateBank.bind(this), 100);

    localStorage.setItem("savedata",JSON.stringify(this.state));
  }


  upgrade (category: number, times:number)
  {
    const upgrades = this.state.forks;

    const cost = Rules.recursiveCost(upgrades[category].level,category, times);
    const currentBugs = this.state.bugs;

    upgrades[category].level+= times;
    upgrades[category].feature = NameGen.getFeatureName();

    if(upgrades[category].level >= 5 && !upgrades[category+1])
    {
      upgrades[category+1] = {feature:NameGen.getFeatureName(), level:0,user:NameGen.getUserName(5,12)}
    }


    this.setState({upgrades:upgrades, bugs:currentBugs.subtract(cost)})
  }

  renameProject (name: string)
  {
    this.setState({projectName:name, changeName:false})
  }

  openRename()
  {
    this.setState({changeName:true})
  }



  render() {
    const {bugs: bank, forks: upgrades, projectName, changeName, nuking} = this.state;
    return(
      <div>
          <PickNamePopup givenName={projectName} onPicked={this.renameProject.bind(this)} open={projectName === "" || changeName} />

          <Alert    cancelButtonText="Nope, nopenopenope"
                    confirmButtonText="Yeah, nuke it!"
                    intent={Intent.DANGER}
                    isOpen={nuking}
                    onCancel={()=>this.setState({nuking:false})}
                    onConfirm={()=>{localStorage.removeItem("savedata"); this.componentDidMount()}}
                >
                    <p>
                        {"Are you sure you want to delete your save data?"}
                    </p>
                </Alert>

          <Navbar fixedToTop={true} color={Colors.BLACK} style={{height:100, paddingTop:10}}>
            <Navbar.Heading>
            <H3 style={{textAlign:"center"}} >
              <Icon icon="git-repo" iconSize={26} style={{marginRight:10}}/>
              {this.state.projectName}
              <Button active={false} icon={"edit"} minimal={true} onClick={this.openRename.bind(this)} />
            </H3>
            <H1 style={{textAlign:"center"}} ><Icon icon={bug} iconSize={44} /> {Rules.str(this.state.bugs)}</H1>
            <Button style={{marginTop:-60}} minimal={true} active={false} icon={nuke} onClick={()=>this.setState({nuking:true})} />  
            </Navbar.Heading>
          </Navbar>

        <div style={{paddingTop:100}} >
          {upgrades.map((upgrade,i) => {
            return <Producer key={i} bugs={bank} level={upgrade.level} user={upgrade.user} featureName={upgrade.feature} projectName={projectName} category={i} upgrade={this.upgrade.bind(this)} />
          })}
        </div>
    </div>
    )
    
  }
}

document.body.className = Classes.DARK;
document.body.style.backgroundColor = Colors.BLACK;
const a = document.createElement('div');
document.body.appendChild(a);
ReactDOM.render(<App />, a);


