from flask import Blueprint, request, jsonify
import cv2
from skimage import io

verifySignature = Blueprint('verifySignature', __name__)

#Works well with images of different dimensions
def orb_sim(img1, img2):
    # SIFT is no longer available in cv2 so using ORB
    orb = cv2.ORB_create()

    # detect keypoints and descriptors
    kp_a, desc_a = orb.detectAndCompute(img1, None)
    kp_b, desc_b = orb.detectAndCompute(img2, None)

    # define the bruteforce matcher object
    bf = cv2.BFMatcher(cv2.NORM_HAMMING, crossCheck=True)
        
    #perform matches. 
    matches = bf.match(desc_a, desc_b)
    #Look for similar regions with distance < 50. Goes from 0 to 100 so pick a number between.
    similar_regions = [i for i in matches if i.distance < 50]  
    if len(matches) == 0:
        return 0
    return len(similar_regions) / len(matches)

def verifySign(img1,img2):
    img1 = io.imread(img1, 0)
    img2 = io.imread(img2, 0)
    orb_similarity = orb_sim(img1, img2)  #1.0 means identical. Lower = not similar
    orb_similarity = orb_similarity *100
    if orb_similarity > 75 :
        isMatch = True
    else:
        isMatch = False
    return isMatch


@verifySignature.route("/",methods=['post'])
def verify():
    image1 = request.form['image1']
    image2 = request.form['image2']
    isMatch = verifySign(image1,image2)
    return jsonify(isMatch)
