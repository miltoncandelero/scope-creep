import React from "react";

import { Button, Card,  ProgressBar, H4, ControlGroup } from "@blueprintjs/core";
import Decimal from "break_infinity.js";
import { Rules } from "../rules";

interface ProducerProps {
    category: number;
    level:number;
    bugs:Decimal;
    projectName:string;
    user:string;
    featureName:string;
    upgrade: (category: number, times:number) => void;
}

export class Producer extends React.Component<ProducerProps>{
    upgrade (times:number) {
        this.props.upgrade(this.props.category, times);
    }

    render() {
        const { category, level, bugs, projectName, user, featureName } = this.props;
        const upgradeCost = Rules.recursiveCost(level,category,1);
        const upgradeCost10 = Rules.recursiveCost(level,category,10);
        const upgradeCost100 = Rules.recursiveCost(level,category,100);

        let allIn = 1;
        let allInCost = Rules.recursiveCost(level,category,1);
        while (bugs.greaterThanOrEqualTo(allInCost))
        {
            allIn++;
            allInCost = Rules.recursiveCost(level,category,allIn);
        }
        allIn--;

        const ratio = bugs.dividedBy(upgradeCost).toNumber();

        const moneyDiff = bugs.subtract(upgradeCost);
        const profit = Rules.earnings(level,category,1);
        const nextProfit = Rules.earnings(level+1,category,1);

        const currentPercent = Math.floor(level/10);
        const nextPercent = Math.floor((level+1)/10);

        return( <Card elevation={4} style={{marginBottom:10}} >
            <ControlGroup fill={true} vertical={false}>
                
            <H4>{"Feature: " + featureName}</H4>
            <p style={{textAlign:"right"}}>{"(" + user+"/"+projectName + ")"}</p>
            </ControlGroup>
            
            <ControlGroup fill={true} vertical={false}>
                <p style={{textAlign:"left"}}>{"Current rate: " + Rules.str(profit) + " bugs/sec" + (currentPercent > 0? " + Global " + currentPercent + "%":"")}</p>
                <p style={{textAlign:"center"}}>{"Merged: " + level}</p>
                <p style={{textAlign:"right"}}>{"Next feature: " + Rules.str(nextProfit)+ " bugs/sec"  + (nextPercent > 0 && nextPercent !== currentPercent ? " + Global " + nextPercent + "%":"")}</p>
            </ControlGroup>
            <ControlGroup fill={false} vertical={false}>
                <Button icon="git-pull" text={"Pull"} onClick={this.upgrade.bind(this, 1)} disabled={bugs.lessThan(upgradeCost)} />
                <Button icon="git-pull" text={"x10"} onClick={this.upgrade.bind(this, 10)} disabled={bugs.lessThan(upgradeCost10) || level === 0} />
                <Button icon="git-pull" text={"x100"} onClick={this.upgrade.bind(this, 100)} disabled={bugs.lessThan(upgradeCost100) || level === 0} />

                {allIn>1 ?(
                    <Button icon="git-pull" text={"ALL IN! (x"+allIn+")"} onClick={this.upgrade.bind(this, allIn)} />
                ) : (null)}

            </ControlGroup>
            <p>{"This branch is " + Rules.str(moneyDiff.abs()) + " commits " + (moneyDiff.greaterThan(0)? "ahead":"behind") + " of master ("+Rules.str(upgradeCost) + " commits)"}</p>
                <ProgressBar key="plsupdate" intent={bugs.lessThan(upgradeCost)?"none":"success"} value={ratio} animate={true} />
        </Card>
        )
    }
}