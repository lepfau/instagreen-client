import React, { Component } from "react";
import apiHandler from "../../api/apiHandler";
import { withRouter } from "react-router-dom";
import { buildFormData } from "../../utils";
import loadingwall from "../../assets/loadingwall.gif";

class FormEditWall extends Component {
  state = {
    title: "",
    subtitle: "",
    httpResponse: null,
    image: "",
    file: null,
    loading: false,
  };

  formRef = React.createRef();

  componentDidMount() {
    apiHandler
      .getWall()
      .then((apiResp) => {
        const postToEdit = apiResp.filter(
          (post) => post._id === this.props.match.params.id
        );
        this.setState({
          title: postToEdit[0].title,
          subtitle: postToEdit[0].subtitle,
          id: postToEdit[0]._id,
          image: postToEdit[0].image,
          file: postToEdit[0].image,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange = (event) => {
    const key = event.target.name;
    const value = event.target.value;

    this.setState({ [key]: value });
  };

  handleChangeFile = (event) => {
    event.preventDefault();
    this.setState({
      image: event.target.files[0],
      file: URL.createObjectURL(event.target.files[0]),
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const fd = new FormData();
    const { httpResponse, ...data } = this.state;
    buildFormData(fd, data);

    apiHandler
      .editWall(this.state.id, fd)
      .then((data) => {
        this.setState({ loading: true });
        setTimeout(() => {
          this.setState({ loading: false });
          this.props.history.push("/wall");
        }, 1000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="wallForm2">
          <form className="form" onSubmit={this.handleSubmit}>
            <h2 className="myplantstitle">Edit your Post</h2>

            <div className="form-group">
              <label className="labelwall" htmlFor="title">
                Title
              </label>
              <input
                id="title"
                name="title"
                className="inputwall"
                placeholder="Post title"
                type="text"
                onChange={this.handleChange}
                defaultValue={this.state.title}
              />
            </div>

            <div className="form-group">
              <label className="labelwall" htmlFor="description">
                Subtitle
              </label>
              <input
                id="subtitle"
                name="subtitle"
                type="text"
                className="inputwall"
                placeholder="About this picture"
                onChange={this.handleChange}
                defaultValue={this.state.subtitle}
              ></input>
            </div>

            <div>
              <input
                id="image"
                className="inputfile"
                type="file"
                name="image"
                onChange={this.handleChangeFile}
                defaultValue={this.state.image}
              ></input>
              <label htmlFor="image">Choose a file</label>
            </div>

            {this.state.file !== null && (
              <img
                style={{
                  width: "350px",
                  height: "auto",
                  display: "flex",
                  marginLeft: "60px",
                  marginTop: "20px",
                }}
                src={this.state.file}
                alt="recipeimage"
              />
            )}
            {this.state.loading ? (
              <button className="btn-submit-plant">
                <img
                  style={{ height: "35px" }}
                  src={loadingwall}
                  alt="loading"
                />
              </button>
            ) : (
              <button className="btn-submit-plant">Poster sur le mur</button>
            )}
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(FormEditWall);
