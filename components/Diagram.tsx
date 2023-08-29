import React from "react";
import { StringDecoder } from "string_decoder";

const Diagram = () => {

    class Note {
        public static uniqueNotesCount = 12;
        
        private name: String; 
        private color: String;
        private isActive: Boolean;
        private octave?: Number; // think later
        private fingering?: Number;

        public static nextNote(name: String): String {
            switch (name) {
                case "C":
                    return "C#";
                case "C#":
                    return "D";
                case "D":
                    return "D#";
                case "D#":
                    return "E";
                case "E":
                    return "F";
                case "F":
                    return "F#";
                case "F#":
                    return "G";
                case "G":
                    return "G#";
                case "G#":
                    return "A";
                case "A":
                    return "A#";
                case "A#":
                    return "B";
                case "B":
                    return "C";

                default:
                    break;
            }
            return name;
        }

        constructor(name?: String) {
            this.name = name? name : "";
            this.color = "0x000000";
            this.isActive = false;
            // this.octave = octave ? octave : 3;
        }

        /**
         * getName
         */
        public getName() {
            return this.name;
        }

        public setName(name: String) {
            this.name = name;
        }

        public getColor() {
            return this.color;
        }

        public setColor(color: String) {
            this.color = color;
        }

        public toggleActiveStatus() {
            this.isActive = !this.isActive;
        }

    }
    
    const strings = 6;
    const frets = 8;
    const defaultTuning = ["E", "A", "D", "G", "B", "E"];


    let tuning: Array<String> = new Array<String>(strings);
    for (let i = 0; i<strings; i++) {
        tuning[i] = defaultTuning[i];
    }


    const noteGrid: Array<Array<Note>> = [];

    for (let i = 0; i<strings; i++) {

        let currentNote = tuning[i];
        
        noteGrid.push([]);
        
        for (let j = 0; j<frets; j++) {

            noteGrid[i].push( new Note(currentNote) );
            
            currentNote = Note.nextNote(currentNote);
        }
    
    }
    

    const getNotesGridElements = (noteGrid: Array<Array<Note>>) => {
        const gridElements = [];
        for (let fretIndex = 0; fretIndex <  frets; fretIndex++) {
            for (let stringIndex = 0; stringIndex < strings; stringIndex++) {

                let noteName = noteGrid[stringIndex][fretIndex].getName();
                

                let item = <div className="m-0 p-6 border-2 border-black w-16 h-20">
                        <div className="transform translate-x-8">
                            {noteName}
                        </div>
                    </div>;
                

                if (!fretIndex && !stringIndex) {
                    item = <div className="m-0 p-6 border-black w-16">
                        <div className="transform translate-x-8">
                            {noteName}
                        </div>
                    </div>
                } else if (!fretIndex) {
                    item = <div className="m-0 p-6 border-black w-16">
                        <div className="transform translate-x-8">
                            {noteName}
                        </div>
                    </div>
                } else if (!stringIndex) {
                    item = <div className="m-0 p-6 border-black w-16">
                        <div className="transform translate-x-8">
                            {noteName}
                        </div>
                    </div>
                }

                
                gridElements.push(item);
            }
        }

        return gridElements;
    }

    // console.log(noteGrid);



    return (
        
        <div className="container flex p-4 m-1">
            <div className={`grid grid-cols-6 gap-0 content-center`}>

                {
                    getNotesGridElements(noteGrid)
                }

            </div>


        </div>
    )
}

export default Diagram