import React, { useEffect,useState } from 'react';
import { ResponsivePie } from '@nivo/pie';
import axios from 'axios';
import { CategoryTag,PatternContainer,ChildInfoContainer,NameTag } from './PatternGraphStyles';
import {useSelectChildStore} from '../../store/SelectChildStore'
import Avatar from '@mui/material/Avatar';
import {useUserStore} from "../../store/UserStore"

interface CategoryData{
    sum:number;
    list:
        {
            id:string;
            label:string;
            value:number;
        }[];

}
const dumydata=[
    {
      "id": "hack",
      "label": "hack",
      "value": 431,
      "color": "hsl(159, 70%, 50%)"
    },
    {
      "id": "erlang",
      "label": "erlang",
      "value": 241,
      "color": "hsl(1, 70%, 50%)"
    },
    {
      "id": "lisp",
      "label": "lisp",
      "value": 148,
      "color": "hsl(272, 70%, 50%)"
    },
    {
      "id": "scala",
      "label": "scala",
      "value": 215,
      "color": "hsl(98, 70%, 50%)"
    },
    {
      "id": "haskell",
      "label": "haskell",
      "value": 500,
      "color": "hsl(28, 70%, 50%)"
    }
  ]

const PatternGraph = () => {
    const colortag = [' #7fc97f','#beaed4','#fdc086','#ffff99','#386cb0','#f0027f','#bf5b17','#666666']
    const [category, setCategory] = useState<CategoryData>();
    const {childname,childimg}=useSelectChildStore();
    const {accessToken,name,account} =useUserStore()

    const GetPattern = ()=>{
        axios
            .post('https://ijoah01.duckdns.org/api/bank/analyze',{
                accountNumber: account
            },{
                headers: {
                Authorization: `Bearer ${accessToken}`,
                },
            })
            .then((response)=>{
                console.log(response)
                setCategory(response.data)
                console.log(category)
            })
            .catch((error)=>{
                console.log(error)
            })
    }
    useEffect(()=>{
        GetPattern()
    },[])

    const data = category?.list || [];
    
    return (
        <PatternContainer>
            <ChildInfoContainer>
            <Avatar
                        variant="circular"
                        className="border-2 border-white hover:z-10 focus:z-10"
                        src={childimg}
                        />
                <NameTag className="text-2xl text-center font-['HSYuji-Regular']">{childname}의 소비 패턴</NameTag>
            </ChildInfoContainer>
        <div style={{ display:'center', width: '90vw', height: '40vh', justifyContent:'center' }}>
                  <ResponsivePie
        data={dumydata}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeInnerRadiusOffset={16}
        activeOuterRadiusOffset={25}
        colors={{ scheme: 'accent' }}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsDiagonalLength={36}
        arcLinkLabelsStraightLength={18}
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        enableArcLabels={false}
        arcLabel="id"
        arcLabelsSkipAngle={22}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        isInteractive={false}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[]}
    />
    
    </div>
    {category?.list.map((tag, index)=>(
        <CategoryTag>
            <div style={{ backgroundColor: colortag[index], height: '10px',width:'10px', marginRight:'5px' }}></div>
            {tag.id} : {((tag.value / category.sum) * 100).toFixed(1)}%
        </CategoryTag>
    ))}
        <div
            style={{height:'150px'}}></div>
    </PatternContainer>
    );
};

export default PatternGraph;