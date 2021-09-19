"use strict";

window.onload = () => {

//////////////////////////////////// Variables for form validation event listener //////////////////////////////////////

    // The wrapper that includes both the submit and begin game buttons
    const button_wrapper = document.getElementById("button-wrapper");

    // The counter that controls if it's player1 or player2's input turn
    let counter_input = 1;

    // Variables to store player1's correct input
    let player1_name;
    let player1_final_ac;
    let player1_final_b;
    let player1_final_s;

    // Variables to store player2's correct input
    let player2_name;
    let player2_final_ac;
    let player2_final_b;
    let player2_final_s;

////////////////////////////////////////////////// Begin form validation ///////////////////////////////////////////////

    // This fires when a user submits input on the player1 and player2 input screens
    button_wrapper.addEventListener("click", () => {
        // Player input variables that are not final
        let player_name = document.getElementById("name").value;
        let player_input = document.getElementById("player-input").value;

        // If the name input is empty
        if (player_name === "") {
            reset_err_msg(err_msg_name);
            print_err_msg_no_name();
        } else { // Else, the name input is not empty
            // If the player input includes any ; so it can be split
            if (player_input.includes(";")) {
                let split_input = player_input.split(";");
                split_input.sort(); // Sorts the indexes alphabetically by the first char in each indexes' string

                // If there are 3 indexes in the array
                if (split_input.length === 3) {
                    let player_ac_input = split_input[0];
                    let player_b_input = split_input[1];
                    let player_s_input = split_input[2];

                    // If the input in all the fields is in the right format
                    if ((check_ac_input(player_ac_input) === true) && (check_b_input(player_b_input) === true) && (check_s_input(player_s_input) === true)) {
                        reset_err_msg(err_msg);
                        if (counter_input === 1) {
                            // Saves player1's correct input into a new variable
                            player1_name = player_name.toString();

                            // Takes the correct input and makes sure it's uppercase so it's standardized
                            let player1_correct_ac_input = player_ac_input.toString().toUpperCase();
                            let player1_correct_b_input = player_b_input.toString().toUpperCase();
                            let player1_correct_s_input = player_s_input.toString().toUpperCase();

                            // Saves the cords into an array
                            let player1_ac_cords = save_cords(player1_correct_ac_input);
                            let player1_b_cords = save_cords(player1_correct_b_input);
                            let player1_s_cords = save_cords(player1_correct_s_input);

                            // Creates an array of all the squares in the aircraft/battleship/submarine pieces
                            let player1_ac_all_spaces = all_spaces_arr(player1_ac_cords, 5);
                            let player1_b_all_spaces = all_spaces_arr(player1_b_cords, 4);
                            let player1_s_all_spaces = all_spaces_arr(player1_s_cords, 3);

                            // If any of the pieces have overlapping squares
                            if (check_overlapping(player1_ac_all_spaces, player1_b_all_spaces, player1_s_all_spaces)) {
                                reset_err_msg(err_msg);

                                // Resets the piece's inputs
                                document.getElementById("player-input").value = "";

                                print_err_msg_overlapping();
                            } else { // Else, none of the inputs overlap
                                // Sets the final coordinates for all of player1's pieces
                                player1_final_ac = player1_ac_all_spaces;
                                player1_final_b = player1_b_all_spaces;
                                player1_final_s = player1_s_all_spaces;

                                reset_err_msg(err_msg);

                                // Resets input field values
                                document.getElementById("name").value = "";
                                document.getElementById("player-input").value = "";

                                // Changes the header's text
                                document.getElementById("enter-name").textContent = "Enter Player 2's name";

                                // Hides the first display button
                                document.getElementById("submit-button").style.display = "none";

                                // Displays the second display button
                                document.getElementById("submit-button-2").style.display = "block";

                                // Sets the counter1 to 2 so player2's inputs can be checked and saved
                                counter_input++;
                            }
                        } else if (counter_input === 2) { // Else if it's player2's turn to input information
                            // Saves player2's correct input into a new variable
                            player2_name = player_name.toString();

                            // Takes the correct input and makes sure it's uppercase so it's standardized
                            let player2_correct_ac_input = player_ac_input.toString().toUpperCase();
                            let player2_correct_b_input = player_b_input.toString().toUpperCase();
                            let player2_correct_s_input = player_s_input.toString().toUpperCase();

                            // Saves the cords into an array
                            let player2_ac_cords = save_cords(player2_correct_ac_input);
                            let player2_b_cords = save_cords(player2_correct_b_input);
                            let player2_s_cords = save_cords(player2_correct_s_input);

                            // Creates an array of all the squares in the aircraft/battleship/submarine pieces
                            let player2_ac_all_spaces = all_spaces_arr(player2_ac_cords, 5);
                            let player2_b_all_spaces = all_spaces_arr(player2_b_cords, 4);
                            let player2_s_all_spaces = all_spaces_arr(player2_s_cords, 3);

                            // If any of the inputs have overlapping squares
                            if (check_overlapping(player2_ac_all_spaces, player2_b_all_spaces, player2_s_all_spaces)) {
                                reset_err_msg(err_msg);

                                // Resets the piece's inputs
                                document.getElementById("player-input").value = "";

                                print_err_msg_overlapping();
                            } else { // Else, it isn't overlapping
                                // Sets the final coordinates for all of player2's pieces
                                player2_final_ac = player2_ac_all_spaces;
                                player2_final_b = player2_b_all_spaces;
                                player2_final_s = player2_s_all_spaces;

                                // Hides the user-input div
                                document.getElementById("user-input").style.display = "none";

                                // Displays the begin-turn div
                                document.getElementById("begin-turn").style.display = "block";

                                // Sets the header with player1's name
                                document.getElementById("begin-turn-header").textContent = "Click the button to begin " + player1_name + "'s turn";
                            }
                        }
                    } else { // Else, one or more of the inputs are in the wrong format
                        reset_err_msg(err_msg);

                        // Resets the piece's inputs
                        document.getElementById("player-input").value = "";

                        print_err_msg();
                    }
                } else { // Else, the array is not a length of 3 so the array cannot contain 100% correct inputs
                    reset_err_msg(err_msg);

                    // Resets the piece's inputs
                    document.getElementById("player-input").value = "";

                    print_err_msg();
                }
            } else { // Else, the input cannot be correct because it doesn't contain a ;
                reset_err_msg(err_msg);

                // Resets the piece's inputs
                document.getElementById("player-input").value = "";

                print_err_msg();
            }
        }
    }); // End button_wrapper event listener

///////////////////////////////////////////////// End form validation //////////////////////////////////////////////////

///////////////////////////////////// Variables for form gameboard event listener //////////////////////////////////////

    // The button to begin game turns
    const begin_turn_button = document.getElementById("begin-turn-button");

    // Counter to keep track of turns for player1 and player2
    let counter_turns = 1;

    // Divs
    const begin_turn_div = document.getElementById("begin-turn");
    const board_1_div = document.getElementById("board-1-div");
    const board_2_div = document.getElementById("board-2-div");

    // Headers
    const ship_placement_header = document.getElementById("ship-placement-header");
    const target_header = document.getElementById("target-header");

//////////////////////////////////////////////////// Begin gameboard ///////////////////////////////////////////////////

    // This fires when a user clicks the button to begin the turn
    begin_turn_button.addEventListener("click", () => {
        // If it's player1's turn
        if (counter_turns === 1) {
            begin_turn_div.style.display = "none";

            board_1_div.style.display = "block";
            board_2_div.style.display = "block";

            ship_placement_header.textContent = player1_name + "'s ship placements";
            target_header.textContent = player1_name + "'s target";

            reset_board_colors(player2_hits, player2_misses, "-1"); // Resets player1's ship placement board colors
            reset_board_colors(player1_hits, player1_misses, "-2"); // Resets player1's target board colors

            reset_board_pieces(); // Resets player1's ship placement board pieces

            print_pieces(player1_final_ac, "A"); // Prints A on the appropriate squares on player1's ship placement board
            print_pieces(player1_final_b, "B"); // Prints B on the appropriate squares on player1's ship placement board
            print_pieces(player1_final_s, "S"); // Prints S on the appropriate squares on player1's ship placement board

            add_cell_listener(); // Adds event listeners to player1's target table's cells
        } else if (counter_turns === 2) { // Else if it's player2's turn
            begin_turn_div.style.display = "none";

            board_1_div.style.display = "block";
            board_2_div.style.display = "block";

            ship_placement_header.textContent = player2_name + "'s ship placements";
            target_header.textContent = player2_name + "'s target";

            reset_board_colors(player1_hits, player1_misses, "-1"); // Resets player1's ship placement board colors
            reset_board_colors(player2_hits, player2_misses, "-2"); // Resets player1's target board colors

            reset_board_pieces(); // Resets player2's ship placement board pieces

            print_pieces(player2_final_ac, "A"); // Prints A on the appropriate squares on player2's ship placement board
            print_pieces(player2_final_b, "B"); // Prints A on the appropriate squares on player2's ship placement board
            print_pieces(player2_final_s, "S"); // Prints A on the appropriate squares on player2's ship placement board

            add_cell_listener(); // Adds event listeners to player2's target table's cells
        }
    }); // End begin_turn_button event listener

///////////////////////////////////////////////////// End gameboard ////////////////////////////////////////////////////

/////////////////////////////////////////////////// Helper functions ///////////////////////////////////////////////////

/////////////////////////////////////////// Variables for helper functions /////////////////////////////////////////////

    // Arrays with the players' hits/misses
    const player1_hits = [];
    const player1_misses = [];
    const player2_hits = [];
    const player2_misses = [];

    // Divs
    const err_msg = document.getElementById("error-msg");
    const err_msg_name = document.getElementById("error-msg-name");
    const overlay_div = document.getElementById("overlay-div");
    const score_div = document.getElementById("score-div");

    // Flags
    let misclick_flag = false; // Keeps track if the player clicked a previously selected cell
    let end_flag = false; // Keeps track if the ending overlay was shown

    // HTML elements
    const h3 = document.createElement("h3");
    const p = document.createElement("p");

    // Piece counters for player1
    let ac_piece_counter_1 = 0;
    let b_piece_counter_1 = 0;
    let s_piece_counter_1 = 0;

    // Piece counters for player2
    let ac_piece_counter_2 = 0;
    let b_piece_counter_2 = 0;
    let s_piece_counter_2 = 0;

    // Scores
    let player1_score = 24;
    let player2_score = 24;

/////////////////////////////////////////////// Functions to check input ///////////////////////////////////////////////

    // Creates an array that contains all the squares needed for a game piece
    function all_spaces_arr(cords, x) {
        let all_spaces = [];

        // If the first char of the first cord equals the first char of the second cord (EX: both are A)
        if (cords[0].charAt(0) === cords[1].charAt(0)) {
            for (let i = 0; i < x; i++) {
                if (i === 0) {
                    all_spaces[i] = cords[0]; // Save the first square (aka the initial cord 1) (EX: A1)
                } else {
                    all_spaces[i] = cords[0].charAt(0) + (parseInt(cords[0].charAt(1)) + i); // Fill the array with the remaining squares (EX: A2, A3, A4, A5)
                }
            }
        } else if (cords[0].charAt(1) === cords[1].charAt(1)) { // If the second char of the first cord and the second char of the second cord are equal (EX: both 1)
            if (cords[0].charAt(1) === "1" && cords[0].charAt(2) === "0") { // AND the cord's number is 10
                for (let i = 0; i < x; i++) {
                    if (i === 0) {
                        all_spaces[i] = cords[0]; // Save the first square (aka the initial cord 1) (EX: A10)
                    } else {
                        all_spaces[i] = String.fromCharCode(all_spaces[i - 1].charAt(0).charCodeAt(0) + 1) + cords[1].charAt(1) + cords[1].charAt(2); // Fill the array with the remaining squares (EX: B10, C10, D10, E10)
                    }
                }
            } else { // Else, the second char of the first cord and the second char of the second cord are equal (EX: both 1)
                for (let i = 0; i < x; i++) {
                    if (i === 0) {
                        all_spaces[i] = cords[0]; // Save the first square (aka the initial cord 1) (EX: A1)
                    } else {
                        all_spaces[i] = String.fromCharCode(all_spaces[i - 1].charAt(0).charCodeAt(0) + 1) + cords[1].charAt(1); // Fill the array with the remaining squares (EX: B1, C1, D1, E1)
                    }
                }
            }
        }

        return all_spaces;
    } // End all_spaces_arr

    // Checks the aircraft carrier input's format
    function check_ac_input(a) {
        a = a.toString().toUpperCase();

        if (a.charAt(0) === "A" && a.charAt(1) === "(" && a.charAt(a.length - 1) === ")") { // If the AC input is in the right format
            a = a.split("-");

            if ((a[0].length === 4) && (a[1].length === 3)) { // EX: "A(A1" and "A5)"
                // Vertical check
                if ((a[0].charAt(2) === a[1].charAt(0)) && (a[0].charAt(2).match(/[A-J]/).length > 0)) { //  Checks to see if the letters are the same and a valid letter
                    return (a[0].charAt(3) === "1" && a[1].charAt(1) === "5") || (a[0].charAt(3) === "2" && a[1].charAt(1) === "6") ||
                        (a[0].charAt(3) === "3" && a[1].charAt(1) === "7") || (a[0].charAt(3) === "4" && a[1].charAt(1) === "8") ||
                        (a[0].charAt(3) === "5" && a[1].charAt(1) === "9"); // Returns true or false if the pieces are valid
                }

                // Horizontal check
                if ((a[0].charAt(3) === a[1].charAt(1)) && (a[0].charAt(3).match(/[1-9]/).length > 0)) { // Checks to see if the numbers are the same and a valid number
                    return (a[0].charAt(2) === "A" && a[1].charAt(0) === "E") || (a[0].charAt(2) === "B" && a[1].charAt(0) === "F") ||
                        (a[0].charAt(2) === "C" && a[1].charAt(0) === "G") || (a[0].charAt(2) === "D" && a[1].charAt(0) === "H") ||
                        (a[0].charAt(2) === "E" && a[1].charAt(0) === "I") || (a[0].charAt(2) === "F" && a[1].charAt(0) === "J"); // Returns true or false if the pieces are valid
                }
            }

            if ((a[0].length === 4) && (a[1].length === 4)) { // EX: "A(A6" and "A10)"
                // Vertical check
                if ((a[0].charAt(2) === a[1].charAt(0)) && (a[0].charAt(2).match(/[A-J]/).length > 0)) { //  Checks to see if the letters are the same and a valid letter
                    return (a[0].charAt(3) === "6") && (a[1].charAt(1) === "1") && (a[1].charAt(2) === "0"); // Returns true or false if the pieces are valid
                }
            }

            if ((a[0].length === 5) && (a[1].length === 4)) { // EX: "A(A10" and "E10)"
                // Horizontal check
                if ((a[0].charAt(3) === "1" && a[0].charAt(4) === "0") && (a[1].charAt(1) === "1" && a[1].charAt(2) === "0")) { // Checks to see if the numbers are the same
                    return (a[0].charAt(2) === "A" && a[1].charAt(0) === "E") || (a[0].charAt(2) === "B" && a[1].charAt(0) === "F") ||
                        (a[0].charAt(2) === "C" && a[1].charAt(0) === "G") || (a[0].charAt(2) === "D" && a[1].charAt(0) === "H") ||
                        (a[0].charAt(2) === "E" && a[1].charAt(0) === "I") || (a[0].charAt(2) === "F" && a[1].charAt(0) === "J"); // Returns true or false if the pieces are valid
                }
            }

            return false; // Catches if a user has an input like S(A111-A999)
        } else { // Else, the format is completely incorrect
            return false;
        }
    } // End check_ac_input

    // Checks the battleship input's format
    function check_b_input(b) {
        b = b.toString().toUpperCase();

        if (b.charAt(0) === "B" && b.charAt(1) === "(" && b.charAt(b.length - 1) === ")") { // If the B input is in the correct format
            b = b.split("-");

            if ((b[0].length === 4) && (b[1].length === 3)) { // EX: "B(B1" and "B4)"
                // Vertical check
                if ((b[0].charAt(2) === b[1].charAt(0)) && (b[0].charAt(2).match(/[A-J]/).length > 0)) { // Checks to see if the letters are the same and a valid letter
                    return (b[0].charAt(3) === "1" && b[1].charAt(1) === "4") || (b[0].charAt(3) === "2" && b[1].charAt(1) === "5") ||
                        (b[0].charAt(3) === "3" && b[1].charAt(1) === "6") || (b[0].charAt(3) === "4" && b[1].charAt(1) === "7") ||
                        (b[0].charAt(3) === "5" && b[1].charAt(1) === "8") || (b[0].charAt(3) === "6" && b[1].charAt(1) === "9"); // Returns true or false if the pieces are valid
                }

                // Horizontal check
                if ((b[0].charAt(3) === b[1].charAt(1)) && (b[0].charAt(3).match(/[1-9]/).length > 0)) { // Checks to see if the numbers are the same and a valid number
                    return (b[0].charAt(2) === "A" && b[1].charAt(0) === "D") || (b[0].charAt(2) === "B" && b[1].charAt(0) === "E") ||
                        (b[0].charAt(2) === "C" && b[1].charAt(0) === "F") || (b[0].charAt(2) === "D" && b[1].charAt(0) === "G") ||
                        (b[0].charAt(2) === "E" && b[1].charAt(0) === "H") || (b[0].charAt(2) === "F" && b[1].charAt(0) === "I") ||
                        (b[0].charAt(2) === "G" && b[1].charAt(0) === "J"); // Returns true or false if the pieces are valid
                }
            }

            if ((b[0].length === 4) && (b[1].length === 4)) { // EX: "B(A7" and "A10)"
                // Vertical check
                if ((b[0].charAt(2) === b[1].charAt(0)) && (b[0].charAt(2).match(/[A-J]/).length > 0)) { // Checks to see if the letters are the same and a valid letter
                    return b[0].charAt(3) === "7" && b[1].charAt(1) === "1" && b[1].charAt(2) === "0"; // Returns true or false if the pieces are valid
                }
            }

            if ((b[0].length === 5) && (b[1].length === 4)) { // EX: "B(A10" and "D10)"
                // Horizontal check
                if ((b[0].charAt(3) === "1" && b[0].charAt(4) === "0") && (b[1].charAt(1) === "1" && b[1].charAt(2) === "0")) { // Checks to see if the numbers are the same
                    return (b[0].charAt(2) === "A" && b[1].charAt(0) === "D") || (b[0].charAt(2) === "B" && b[1].charAt(0) === "E") ||
                        (b[0].charAt(2) === "C" && b[1].charAt(0) === "F") || (b[0].charAt(2) === "D" && b[1].charAt(0) === "G") ||
                        (b[0].charAt(2) === "E" && b[1].charAt(0) === "H") || (b[0].charAt(2) === "F" && b[1].charAt(0) === "I") ||
                        (b[0].charAt(2) === "G" && b[1].charAt(0) === "J"); // Returns true or false if the pieces are valid
                }
            }

            return false; // Catches if a user has an input like B(A111-A999)
        } else { // Else, the format is completely incorrect
            return false;
        }
    } // End check_b_input

    // Checks the submarine input's format
    function check_s_input(s) {
        s = s.toString().toUpperCase();

        if (s.charAt(0) === "S" && s.charAt(1) === "(" && s.charAt(s.length - 1) === ")") { // If the S input is in the correct format
            s = s.split("-");

            if ((s[0].length === 4) && (s[1].length === 3)) { // EX: "S(A1" and "A3)"
                // Vertical check
                if ((s[0].charAt(2) === s[1].charAt(0)) && (s[0].charAt(2).match(/[A-J]/).length > 0)) { //  Checks to see if the letters are the same and a valid letter
                    return (s[0].charAt(3) === "1" && s[1].charAt(1) === "3") || (s[0].charAt(3) === "2" && s[1].charAt(1) === "4") ||
                        (s[0].charAt(3) === "3" && s[1].charAt(1) === "5") || (s[0].charAt(3) === "4" && s[1].charAt(1) === "6") ||
                        (s[0].charAt(3) === "5" && s[1].charAt(1) === "7") || (s[0].charAt(3) === "6" && s[1].charAt(1) === "8") ||
                        (s[0].charAt(3) === "7" && s[1].charAt(1) === "9"); // Returns true or false if the pieces are valid
                }

                // Horizontal check
                if ((s[0].charAt(3) === s[1].charAt(1)) && (s[0].charAt(3).match(/[1-9]/).length > 0)) { // Checks to see if the numbers are the same and a valid number
                    return (s[0].charAt(2) === "A" && s[1].charAt(0) === "C") || (s[0].charAt(2) === "B" && s[1].charAt(0) === "D") ||
                        (s[0].charAt(2) === "C" && s[1].charAt(0) === "E") || (s[0].charAt(2) === "D" && s[1].charAt(0) === "F") ||
                        (s[0].charAt(2) === "E" && s[1].charAt(0) === "G") || (s[0].charAt(2) === "F" && s[1].charAt(0) === "H") ||
                        (s[0].charAt(2) === "G" && s[1].charAt(0) === "I") || (s[0].charAt(2) === "H" && s[1].charAt(0) === "J"); // Returns true or false if the pieces are valid
                }
            }

            if ((s[0].length === 4) && (s[1].length === 4)) { // EX: "S(A8" and "A10)"
                // Vertical check
                if ((s[0].charAt(2) === s[1].charAt(0)) && (s[0].charAt(2).match(/[A-J]/).length > 0)) { //  Checks to see if the letters are the same and a valid letter
                    return s[0].charAt(3) === "8" && s[1].charAt(1) === "1" && s[1].charAt(2) === "0"; // Returns true or false if the pieces are valid
                }
            }

            if ((s[0].length === 5) && (s[1].length === 4)) { // EX: "S(A10" and "C10)"
                // Horizontal check
                if ((s[0].charAt(3) === "1" && s[0].charAt(4) === "0") && (s[1].charAt(1) === "1" && s[1].charAt(2) === "0")) { // Checks to see if the numbers are the same
                    return (s[0].charAt(2) === "A" && s[1].charAt(0) === "C") || (s[0].charAt(2) === "B" && s[1].charAt(0) === "D") ||
                        (s[0].charAt(2) === "C" && s[1].charAt(0) === "E") || (s[0].charAt(2) === "D" && s[1].charAt(0) === "F") ||
                        (s[0].charAt(2) === "E" && s[1].charAt(0) === "G") || (s[0].charAt(2) === "F" && s[1].charAt(0) === "H") ||
                        (s[0].charAt(2) === "G" && s[1].charAt(0) === "I") || (s[0].charAt(2) === "H" && s[1].charAt(0) === "J"); // Returns true or false if the pieces are valid
                }
            }

            return false; // Catches if a user has an input like S(A111-A999)
        } else { // Else, the format is completely incorrect
            return false;
        }
    } // End check_s_input

    // Checks to see if the input's pieces have any overlapping spaces
    function check_overlapping(a, b, s) {
        let flag = false;

        // Loops through the ac and b pieces' squares to see if any overlap
        for (let i = 0; i < a.length; i++) {
            for (let j = 0; j < b.length; j++) {
                if (a[i] === b[j]) {
                    flag = true;
                    break;
                }
            }
            if (flag === true) {
                return flag;
            }
        }

        // Loops through the ac and s pieces' squares to see if any overlap
        for (let k = 0; k < a.length; k++) {
            for (let l = 0; l < s.length; l++) {
                if (a[k] === s[l]) {
                    flag = true;
                    break;
                }
            }
            if (flag === true) {
                return flag;
            }
        }

        // Loops through the b and s pieces' squares to see if any overlap
        for (let m = 0; m < b.length; m++) {
            for (let n = 0; n < s.length; n++) {
                if (b[m] === s[n]) {
                    flag = true;
                    break;
                }
            }
            if (flag === true) {
                return flag;
            }
        }

        return flag;
    } // End check_overlapping

    // Prints an error message for formatting issues
    function print_err_msg() {
        const ul = document.createElement("ul");

        h3.textContent = "Error:";
        p.textContent = "One or more of the inputs is incorrect. Please use the following formatting:";

        err_msg.appendChild(h3);
        err_msg.appendChild(p);

        let li = document.createElement("li");
        li.textContent = "A(A1-A5);B(B6-E6);S(H3-J3)";
        ul.appendChild(li);

        err_msg.appendChild(ul);
    } // End print_err_msg

    // Prints an error message if the user has not input a name
    function print_err_msg_no_name() {
        h3.textContent = "Error:";
        p.textContent = "You must input a name";

        err_msg.appendChild(h3);
        err_msg.appendChild(p);
    } // End print_err_msg_no_name

    // Prints an error message for overlapping issues
    function print_err_msg_overlapping() {
        h3.textContent = "Error:";
        p.textContent = "Two or more of the inputs have overlapping pieces.";

        err_msg_name.appendChild(h3);
        err_msg_name.appendChild(p);
    } // End print_err_msg_overlapping

    // Resets the error message div's contents
    function reset_err_msg(err) {
        err.textContent = "";
    } // End reset_err_msg

    // Saves the coordinates so they can be used in check_overlapping
    function save_cords(correct_input) {
        let first_cord;
        let second_cord;

        if (correct_input.length === 8) { // EX: A(A1-A5)
            first_cord = correct_input[2] + correct_input[3];
            second_cord = correct_input[5] + correct_input[6];
        } else if (correct_input.length === 9) { // EX: A(A6-A10)
            first_cord = correct_input[2] + correct_input[3];
            second_cord = correct_input[5] + correct_input[6] + correct_input[7];
        } else if (correct_input.length === 10) { // EX: A(A10-E10)
            first_cord = correct_input[2] + correct_input[3] + correct_input[4];
            second_cord = correct_input[6] + correct_input[7] + correct_input[8];
        }

        return [first_cord, second_cord];
    } // End save_cords

////////////////////////////////////////// Functions for gameboard  ////////////////////////////////////////////////////

    // Adds an event listener to each cell in the target table
    function add_cell_listener() {
        let letter = "A";
        let x = 1;

        for (let i = 0; i < 100; i++) { // Loops through all the target table's cells
            let cell = document.getElementById(letter + x.toString() + "-2"); // Gets the cell from the target table
            cell.addEventListener("click", click_cell); // Adds an event listener to the cell
            x++; // Increases the number
            if (x % 11 === 0) { // Checks to see if the cell is at the beginning of the col
                x = 1;
                letter = String.fromCharCode(letter.charCodeAt(0) + 1); // Goes to the next letter in the alphabet
            }
        }
    } // End add_cell_listener

    // This function is called when the target table's cell is clicked
    function click_cell() {
        let cell = document.getElementById(event.target.id); // The clicked cell's element
        let cs = window.getComputedStyle(cell); // Gets the computed style of the cell

        // Flags if player1 clicked a piece's square
        let flag1_1 = false; // ac
        let flag2_1 = false; // b
        let flag3_1 = false; // s

        // Flags if player2 clicked a piece's square
        let flag1_2 = false; // ac
        let flag2_2 = false; // b
        let flag3_2 = false; // s

        // If the clicked cell's background is red or white, it's a misclick
        misclick_flag = cs.getPropertyValue("background").includes("rgb(215, 0, 0)") ||
            cs.getPropertyValue("background").includes("rgb(255, 255, 255)");

        // If it's not a misclick and it's player1's turn
        if (misclick_flag === false && counter_turns === 1) {
            for (let i = 0; i < player2_final_ac.length; i++) {
                if (player2_final_ac[i] + "-2" === cell.id) {
                    flag1_1 = true; // Flags that the piece is part of the ac
                    ac_piece_counter_1++;
                    break;
                }
            }

            for (let j = 0; j < player2_final_b.length; j++) {
                if (player2_final_b[j] + "-2" === cell.id) {
                    flag2_1 = true; // Flags that the piece is part of the b
                    b_piece_counter_1++;
                    break;
                }
            }

            for (let k = 0; k < player2_final_s.length; k++) {
                if (player2_final_s[k] + "-2" === cell.id) {
                    flag3_1 = true; // Flags that the piece is part of the ac
                    s_piece_counter_1++;
                    break;
                }
            }

            if (flag1_1 === true) { // If a square on player2's ac was hit
                if (ac_piece_counter_1 < 5) { // If the ac is not sunk
                    div_overlay("It was a hit! Click to finish turn.", misclick_flag);
                    cell.style.background = "#D70000";
                    player1_hits.push(cell.id); // Adds the cell id to the player1 hits array
                    player2_score -= 2;
                } else { // Else, the ac was sunk
                    div_overlay("AIRCRAFT CARRIER SUNK! Click to finish turn.", misclick_flag);
                    cell.style.background = "#D70000";
                    player1_hits.push(cell.id); // Adds the cell id to the player1 hits array
                    ac_piece_counter_1 = 0;
                    player2_score -= 2;
                }
            } else if (flag2_1 === true) { // If a square on player2's b was hit
                if (b_piece_counter_1 < 4) { // If the b wasn't sunk
                    div_overlay("It was a hit! Click to finish turn.", misclick_flag);
                    cell.style.background = "#D70000";
                    player1_hits.push(cell.id); // Adds the cell id to the player1 hits array
                    player2_score -= 2;
                } else { // Else, the b was sunk
                    div_overlay("BATTLESHIP SUNK! Click to finish turn.", misclick_flag);
                    cell.style.background = "#D70000";
                    player1_hits.push(cell.id); // Adds the cell id to the player1 hits array
                    b_piece_counter_1 = 0;
                    player2_score -= 2;
                }
            } else if (flag3_1 === true) { // If a square on player2's s was hit
                if (s_piece_counter_1 < 3) { // If the s wasn't sunk
                    div_overlay("It was a hit! Click to finish turn.", misclick_flag);
                    cell.style.background = "#D70000";
                    player1_hits.push(cell.id); // Adds the cell id to the player1 hits array
                    player2_score -= 2;
                } else { // Else, the s was sunk
                    div_overlay("SUBMARINE SUNK! Click to finish turn.", misclick_flag);
                    cell.style.background = "#D70000";
                    player1_hits.push(cell.id); // Adds the cell id to the player1 hits array
                    s_piece_counter_1 = 0;
                    player2_score -= 2;
                }
            } else { // Else, none of player2's pieces' squares were hit
                div_overlay("It was a miss! Click to finish turn.", misclick_flag);
                cell.style.background = "#FFFFFF";
                player1_misses.push(cell.id); // Adds the cell id to the player1 misses array
            }
        } else if (misclick_flag === false && counter_turns === 2) { // If it was not a misclick and it's player2's turn
            for (let i = 0; i < player1_final_ac.length; i++) {
                if (player1_final_ac[i] + "-2" === cell.id) {
                    flag1_2 = true; // Flags that it's part of the ac
                    ac_piece_counter_2++;
                    break;
                }
            }

            for (let j = 0; j < player1_final_b.length; j++) {
                if (player1_final_b[j] + "-2" === cell.id) {
                    flag2_2 = true; // Flags that it's part of the b
                    b_piece_counter_2++;
                    break;
                }
            }

            for (let k = 0; k < player1_final_s.length; k++) {
                if (player1_final_s[k] + "-2" === cell.id) {
                    flag3_2 = true; // Flags that it's part of the s
                    s_piece_counter_2++;
                    break;
                }
            }

            if (flag1_2 === true) { // If a square on player1's ac was hit
                if (ac_piece_counter_2 < 5) { // If the ac wasn't sunk
                    div_overlay("It was a hit! Click to finish turn.", misclick_flag);
                    cell.style.background = "#D70000";
                    player2_hits.push(cell.id); // Adds the cell id to the player2 hits array
                    player1_score -= 2;

                } else { // Else, the ac was sunk
                    div_overlay("AIRCRAFT CARRIER SUNK! Click to finish turn.", misclick_flag);
                    cell.style.background = "#D70000";
                    player2_hits.push(cell.id);
                    ac_piece_counter_2 = 0;
                    player1_score -= 2;
                }
            } else if (flag2_2 === true) { // If a square on player1's b was hit
                if (b_piece_counter_2 < 4) { // If the b wasn't sunk
                    div_overlay("It was a hit! Click to finish turn.", misclick_flag);
                    cell.style.background = "#D70000";
                    player2_hits.push(cell.id); // Adds the cell id to the player2 hits array
                    player1_score -= 2;

                } else { // Else, the b was sunk
                    div_overlay("BATTLESHIP SUNK! Click to finish turn.", misclick_flag);
                    cell.style.background = "#D70000";
                    player2_hits.push(cell.id); // Adds the cell id to the player2 hits array
                    ac_piece_counter_2 = 0;
                    player1_score -= 2;
                }
            } else if (flag3_2 === true) { // If a square on the player1's s was hit
                if (s_piece_counter_2 < 3) { // If the s wasn't sunk
                    div_overlay("It was a hit! Click to finish turn.", misclick_flag);
                    cell.style.background = "#D70000";
                    player2_hits.push(cell.id); // Adds the cell id to the player2 hits array
                    player1_score -= 2;
                } else { // Else, the s was sunk
                    div_overlay("SUBMARINE SUNK! Click to finish turn.", misclick_flag);
                    cell.style.background = "#D70000";
                    player2_hits.push(cell.id); // Adds the cell id to the player2 hits array
                    ac_piece_counter_2 = 0;
                    player1_score -= 2;
                }
            } else { // Else, the none of player1's pieces' squares were hit
                div_overlay("It was a miss! Click to finish turn.", misclick_flag);
                cell.style.background = "#FFFFFF";
                player2_misses.push(cell.id); // Adds the cell id to the player2 misses array
            }
        } else { // Else, it was a misclick
            div_overlay("ERROR! You already tried that square. Click to try again.", misclick_flag);
        }
    } // End click_cell

    // This is the function that sets the div overlay. It also controls switching turns and displaying the scoreboard.
    function div_overlay(text, flag) {
        overlay_div.textContent = ""; // Resets the content
        overlay_div.style.display = "flex";
        h3.textContent = text;
        overlay_div.appendChild(h3);

        overlay_div.addEventListener("click", function click_overlay() { // Fires when the overlay div is clicked
            if (flag === false) { // If it's not a misclick
                if (counter_turns === 1) { // If it's player1's turn
                    overlay_div.style.display = "none";
                    board_1_div.style.display = "none";
                    board_2_div.style.display = "none";

                    if (player2_score === 0 && end_flag === false) { // If player2's score is 0, but the game over overlay hasn't been shown yet
                        div_overlay("GAME OVER! Click to see scoreboard.", misclick_flag);
                        end_flag = true;
                    } else if (player2_score === 0 && end_flag === true) { // If player2's score is 0 and the game overlay has been shown
                        score_message(score_div, player1_name, player2_name, player1_score, player2_score);
                    } else if (player2_score > 0) { // Else if player2 hasn't lost yet
                        begin_turn_div.style.display = "block";
                        document.getElementById("begin-turn-header").textContent = "Click the button to begin " + player2_name + "'s turn";
                        counter_turns = 2;
                    }

                    overlay_div.removeEventListener("click", click_overlay);
                } else if (counter_turns === 2) { // Else if it's player2's turn
                    overlay_div.style.display = "none";
                    board_1_div.style.display = "none";
                    board_2_div.style.display = "none";

                    if (player1_score === 0 && end_flag === false) { // If player1's score is 0, but the game over overlay hasn't been shown yet
                        div_overlay("GAME OVER! Click to see scoreboard.", misclick_flag);
                        end_flag = true;
                    } else if (player1_score === 0 && end_flag === true) { // If player1's score is 0, and the game over overlay has been shown
                        score_message(score_div, player2_name, player1_name, player2_score, player1_score);
                    } else if (player1_score > 0) { // Else if player1 hasn't lost yet
                        begin_turn_div.style.display = "block";
                        document.getElementById("begin-turn-header").textContent = "Click the button to begin " + player1_name + "'s turn";
                        counter_turns = 1;
                    }

                    overlay_div.removeEventListener("click", click_overlay);
                }
            } else { // Else, it was a misclick
                overlay_div.style.display = "none";
            }
        }); // End overlay_div event listener
    } // End div_overlay

    // Prints the letters on the ship placements board
    function print_pieces(p, s) {
        for (let i = 0; i < p.length; i++) {
            let cell = document.querySelector("#" + p[i] + "-1");
            if (cell) {
                cell.textContent = s;
            }
        }
    } // End print_pieces

    // Resets the pieces on the ship placements board
    function reset_board_pieces() {
        let letter = "A";
        let x = 1;

        for (let i = 0; i < 100; i++) { // Loops through all the ship placement table's cells
            let cell = document.getElementById(letter + x.toString() + "-1"); // Gets the cell from the ship placement table
            cell.textContent = ""; // Resets the text content
            x++; // Increases the number
            if (x % 11 === 0) { // Checks to see if the cell is at the beginning of the col
                x = 1;
                letter = String.fromCharCode(letter.charCodeAt(0) + 1); // Goes to the next letter in the alphabet
            }
        }
    } // End reset_board_pieces

    // Resets the boards' color back to blue
    function reset_board_colors(p_hits, p_misses, table_id) {
        let letter = "A";
        let x = 1;

        for (let i = 0; i < 100; i++) { // Loops through all the table's cells
            let cell = document.getElementById(letter + x.toString() + table_id); // Gets the cell from the table

            cell.style.background = "#ADD8E6"; // Resets the cell's background color

            for (let j = 0; j < p_hits.length; j++) { // Loops through the player's hits indexes which contain cell IDs
                let p_hit_split = p_hits[j].split('-'); // Splits the ID by its - (EX: "A1" and "1") --> Note: I did this because I'm using this function for both tables
                let cell_split = cell.id.split('-'); // Splits the cell ID by its - as well --> Note: I did this because I'm using this function for both tables
                if (cell_split[0] === p_hit_split[0]) { // If the cell is a hit
                    cell.style.background = "#D70000";
                }
            }

            for (let k = 0; k < p_misses.length; k++) { // Loops through the player's misses indexes which contain cell IDs
                let p_miss_split = p_misses[k].split('-'); // Splits the ID by its - (EX: "A1" and "1") --> Note: I did this because I'm using this function for both tables
                let cell_split = cell.id.split('-'); // Splits the cell ID by its - as well --> Note: I did this because I'm using this function for both tables
                if (cell_split[0] === p_miss_split[0]) { // If the cell is a miss
                    cell.style.background = "#FFFFFF";
                }
            }

            x++; // Increases the number

            if (x % 11 === 0) { // Checks to see if the cell is at the beginning of the col
                x = 1;
                letter = String.fromCharCode(letter.charCodeAt(0) + 1); // Goes to the next letter in the alphabet
            }
        }
    } // End reset_board_colors

    // Displays the score message
    function score_message(div, winner, loser, winner_score, loser_score) {
        div.style.display = "block";
        h3.textContent = winner + " won!";
        p.textContent = "Score calculation:";

        const ul = document.createElement("ul");
        const li1 = document.createElement("li");
        const li2 = document.createElement("li");

        li1.textContent = winner + " score: " + winner_score;
        ul.appendChild(li1);
        li2.textContent = loser + " score: " + loser_score;
        ul.appendChild(li2);

        div.appendChild(h3);
        div.appendChild(p);
        div.appendChild(ul);
    } // End score_message

}; // End window.onload