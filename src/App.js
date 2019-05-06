import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify'
import { withAuthenticator } from 'aws-amplify-react'
import { createNote } from './graphql/mutations'
import { listNotes } from './graphql/queries'

class App extends Component {
  state = {
    note: "",
    notes: [],
  }

  handleChangeNote = event => this.setState({ note: event.target.value })

  handleAddNote = async event => {
    event.preventDefault()
    const { note, notes } = this.state
    const input = {
      note
    }
    const result = await API.graphql(graphqlOperation(createNote, { input }))
    const newNote = result.data.createNote
    const updatedNotes = [newNote, ...notes]
    this.setState({ notes: updatedNotes, note: "" })
  }

  async componentDidMount() {
    const result = await API.graphql(graphqlOperation(listNotes))
    this.setState({ notes: result.data.listNotes.items })
  }

  render() {
    const { note, notes } = this.state

    return (
      <div className="flex flex-column items-center justify-center pa3 bg-washed-red">
        <h1 className="code f2-1">Amplify Notetaker</h1>
        <form onSubmit={this.handleAddNote} className="mb3">
          <input 
          type="text" 
          className="pa2 f4" 
          placeholder="Write your note" 
          onChange={this.handleChangeNote}
          value={note} />
          <button className="pa 2 f4" type="submit" >Add Note</button>
        </form>

        <div>
          {notes.map(note => (
            <div key={note.id} className="flex items-center" >
              <li className="list pa1 f3" >
                {note.note}
              </li>
              <button className="bg-transparent bn f4" >
                <span>&times;</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withAuthenticator(App, {
   includeGreetings: true });
