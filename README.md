# Battleship Web Application
This is a project from CS 1520, Programming Languages for Web Applications. I created a two-player Battleship game with two 10x10 gameboards. 

Though the project description did not require extensive styling or responsivity, I tried to make the web application as neat and user-friendly as possible with some responsive elements. **However, it is not 100% responsive, as the web application only needed to be viewable on a Google Chrome desktop browser**.

### :point_right: Visit the [following url](https://valeriehosler.com/Battleship/) to view a live demo.

### 🧰 Tech Stack 
1. CSS (including Flexbox)
2. HTML
3. JavaScript (ES6)

### :memo: The project had the following specifications:
1. When the page is loaded, the game should begin by asking the first player their name and a string representing their ship placements.
	* The game should accept strings of the following form.
		* `A(A1-A5);B(B6-E6);S(H3-J3);`

2. After gathering the first player's name and ship placement, the game should
  ask the second player for their name and ship placement.

3. With this starting info in hand, the game should begin the first player's turn.
	* At the start of a turn, the game should indicate whose turn it is.
	* After the turn information is dismissed, the game should render two 10x10 grids; one clearly labeled as the current player's ship placements, the other clearly labeled as the current player's target.
		* Both grids should have a light blue background.
		* At the start of the first player's first turn, the target grid will
		  be completely empty, and their grid will show only the location of
		  the first player's ships.
			* On the current player's grid, each space occupied by part of an
			  aircraft carrier should contain an `A`, each space occupied by
			  part of a battleship should contain a `B`, each space occupied by
			  part of a submarine should contain an `S`.
	* The player is then free to click a space in the target grid to "fire" at.
		* Clicks on their own grid should have no effect.
		* The game should produce an overlay to inform the player whether the
		  shot was a hit or a miss.
			* If the player clicks on a space where no part of any of the other
			  player's ships was placed, the shot is a miss, and the space
			  should be colored white.
			* If some part of one of the other player's ships was placed in the
			  clicked space, the shot is a hit, and the space should be colored
			  red.
				* If this hit represents the final portion of a ship, the player should be notified
				  as to which of the other player's ships they have sunk.
		* If the player attempts to fire at the same spot twice, they should be
		  informed that such a selection is invalid and asked to try again.
	* After the player has clicked on their target space and the hit or miss
	  has been reported, the player's turn is ended, and the other player's turn
	  should begin via a notification.

4. At any point in time, a player's target grid should display all the hits
  (red spaces) and misses (white spaces) that they have fired, while their ship
  placement grid shows all of the hits and misses their opponents have fired
  along with their own ship placements.

5. The game continues until all of one player's ships have been sunk, at which
  point the other player wins the game.
	* Once a winner has been established, the game should compute the winner's
	  score:
		* The score is computed as:  24 - (2 points for each hit against them)
			* -10 points for having the aircraft carrier sunk
			* -8 points for having the battleship sunk
			* -6 points for having the submarine sunk
	* Once the game is over, both of the players' scores should be presented to
	  the user.

6. For this project, you are not allowed to use any extra JavaScript libraries.
  You must implement all of this functionality via direct DOM manipulation. You
  *cannot* use `alert()` or `prompt()`.

<em>Note: The project specifications were written by my professor, Dr. Farnan.</em>
