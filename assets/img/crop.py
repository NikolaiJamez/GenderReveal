from PIL import Image

for i in range(177):
    im = Image.open(f"./{i}.png")
    
    # Size of the image in pixels (size of orginal image)
    # (This is not mandatory)
    width, height = im.size
    
    # Setting the points for cropped image
    left = 25
    top = 0
    right = 468
    bottom = height
    
    # Cropped image of above dimension
    # (It will not change orginal image)
    im1 = im.crop((left, top, right, bottom))
    im1.save(f"./newImages/{i}.png")