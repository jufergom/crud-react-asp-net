import React, { Component } from 'react';

class ShinobiItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEdit: false
        }
        this.onDelete = this.onDelete.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onEditSubmit = this.onEditSubmit.bind(this);
    }

    onDelete = () => {
        const { onDelete, id } = this.props;
        onDelete(id);
    }

    onEdit = () => {
        this.setState({isEdit: true});
    }

    onEditSubmit = (event) => {
        event.preventDefault();
        this.props.onEditSubmit(this.props.id, this.nameInput.value, this.ageInput.value, this.rankInput.value);
        this.setState({isEdit: false});
    }

    render() {
      const { name, age ,rank} = this.props;
      return (
        <div>
            {
            this.state.isEdit 
            ? (
                <form onSubmit={this.onEditSubmit}>
                    <input 
                        type="text" 
                        placeholder="nombre del shinobi" 
                        ref={nameInput => this.nameInput = nameInput}
                        defaultValue={name}
                    />
                    <input 
                        type="text" 
                        placeholder="edad del shinobi" 
                        ref={ageInput => this.ageInput = ageInput}
                        defaultValue={age}
                    />
                    <input 
                        type="text" 
                        placeholder="rango ninja" 
                        ref={rankInput => this.rankInput = rankInput}
                        defaultValue={rank}
                    />
                    <button>Save</button>
                </form>
            )
            : (
                <div>
                    <span>{name}</span>
                    {` | `}
                    <span>{age}</span>
                    {` | `}
                    <span>{rank}</span>
                    {` | `}
                    <button onClick={this.onEdit}>edit</button>
                    {` | `}
                    <button onClick={this.onDelete}>delete</button>
                </div>
            )
        }
            
        </div>
      );
    }
  }
  
export default ShinobiItem;