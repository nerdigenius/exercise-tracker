import React,{Component} from 'react';
import {Link} from 'react-router-dom';
import Axios from 'axios';

const Exercise = props =>(
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={'/edit/'+props.exercise._id}>edit</Link> | <a href='#' onClick={()=>{props.deleteExercise(props.exercise._id)}} >Delete</a>
        </td>
    </tr>
)


export default class ExerciseList extends Component {

    constructor(props){
        super(props)

        this.deleteExercise=this.deleteExercise.bind(this);

        this.state={
            exercise:[]
        }
    }

    componentDidMount(){
        Axios.get('http://localhost:5000/exercise/').then(
            response=>{
                    this.setState({
                        exercise:response.data
                    })
            }
        ).catch((error)=>{
            console.log(error);
        })
        
    }

    deleteExercise(id){
        Axios.delete('http://localhost:5000/exercise/'+id)
        .then(res=>console.log(res.data));
        this.setState({
            exercise:this.state.exercise.filter(el=>el._id!==id)
        })
    }

    exerciselist(){
        return this.state.exercise.map(currenexercise=>{
            return<Exercise exercise={currenexercise} deleteExercise={this.deleteExercise} key={currenexercise._id}/>
        })
    }

    render(){
        return(
               <div>
                   <h3>Logged Exercise</h3>
                   <table className='table'>
                       <thead className='thead-light'>
                           <tr>
                               <th>Username</th>
                               <th>Description</th>
                               <th>Duration</th>
                               <th>Date</th>
                               <th>Action</th>
                           </tr>
                       </thead>
                       <tbody>
                           {this.exerciselist()}
                       </tbody>
                   </table>
               </div>
        )
    }
}