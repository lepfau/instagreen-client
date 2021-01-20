import React, { Component } from 'react'
import apiHandler from "../api/apiHandler";

export default class OneUser extends Component {

state ={
    user:[],
    plant:[],
    wall:[]
}

componentDidMount() {
apiHandler
.getUsers()
.then((apiResp) => {
    console.log(apiResp)
    const userInfo = apiResp.filter(
        (user) => user._id === this.props.match.params.id
    );
    this.setState({
        user: userInfo
    })
})

apiHandler
.getPlants()
.then((apiResp) => {
    const userPlants = apiResp.filter (
        (userplant) => userplant.id_user === this.props.match.params.id
    );
    this.setState({
        plant: userPlants
    })
})

apiHandler
.getWall()
.then((apiResp) => {
    console.log(apiResp)
    const userPosts = apiResp.filter (
        (userPost) => userPost.id_user._id === this.props.match.params.id
    );
    this.setState({
        wall: userPosts
    })
})

}



    render() {
        return (
            <div>
                <h1>one user</h1>
                {this.state.user.map((user) => {
                    return (
                        <p>{user.firstName}</p>
                        
                    )
                })}

                {this.state.plant.map((plant) => {
                    return (
                        <div>
                        <p>{plant.name}</p>
                        <img src={plant.image}/>
                    
                    </div>
                    )
                    
                })}

                {this.state.wall.map((post) => {
                    return (
                        <div>
                        <p>{post.title}</p>
                        <img src={post.image}/>
                    </div>
                    )
                })}
            </div>
        )
    }
}
