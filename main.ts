scene.setBackgroundColor(8)
let spacePlane = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . 6 6 6 6 6 6 f . . . . .
    . . . 6 6 8 8 8 6 6 f . . . . .
    . . . . . . 8 8 8 . . . . . . .
    . . . . . . . 8 8 8 . . . . . .
    . . . . . 9 9 9 9 9 9 9 1 9 9 .
    . . . . . 9 9 9 9 9 9 9 9 1 9 .
    . . . . . 9 9 9 9 9 9 9 1 9 9 .
    . . . . . . . 8 8 8 . . . . . .
    . . . . . . 8 8 8 . . . . . . .
    . . . 6 6 8 8 8 6 6 f . . . . .
    . . . . 6 6 6 6 6 6 f . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)
info.setLife(3)
spacePlane.setStayInScreen(true)
controller.moveSprite(spacePlane, 150, 150)
controller.A.onEvent(ControllerButtonEvent.Pressed, function on_a_pressed() {
    let missile = sprites.createProjectileFromSprite(img`
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . f . . . . . .
            . . . . . . . . . . f . . . . .
            . f f 2 2 2 2 2 2 2 2 2 2 2 2 .
            . . . . . . . . . . f . . . . .
            . . . . . . . . . f . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, spacePlane, 200, 0)
})
game.onUpdateInterval(500, function on_update() {
    let bogy = sprites.create(assets.image`bogy`, SpriteKind.Enemy)
    bogy.setVelocity(-100, randint(-30, 30))
    bogy.y = randint(0, scene.screenHeight())
    bogy.left = scene.screenWidth()
    bogy.setFlag(SpriteFlag.AutoDestroy, true)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function on_hit(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy(effects.fire, 100)
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function on_crash(sprite: Sprite, othersprite: Sprite) {
    othersprite.destroy()
    info.changeLifeBy(-1)
})
