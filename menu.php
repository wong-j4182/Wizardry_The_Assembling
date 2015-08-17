<div class="screen">
    <p><button class="active" id="save">Save</button></p>
    <p><button class="active" id="load">Load</button></p>
    <p><button class="active" id="reset">Reset</button></p>
    <p><button class="active" id="logout">Logout</button></p>
</div>

<form method="post" action="save.php" id="save_form" style="display:none;">
    <input type="text" name="playerHealth" id="form_playerHealth" />
    <input type="text" name="computerHealth" id="form_computerHealth" />
    <input type="text" name="playerMana" id="form_playerMana" />
    <input type="text" name="computerMana" id="form_computerMana" />
    <input type="text" name="currentMana" id="form_currentMana" />
    <input type="text" name="playerHand" id="form_playerHand" />
    <input type="text" name="playerDeck" id="form_playerDeck" />
    <input type="text" name="computerHand" id="form_computerHand" />
    <input type="text" name="computerDeck" id="form_computerDeck" />
</form>
