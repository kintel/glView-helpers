import THREE from 'three';

class ImagePlane extends THREE.Object3D{
  constructor (width, length, imgUrl, resolution, upVector) {
    super();
    this.width = width || 200;
    this.length = length || 200;
    this.imgUrl = imgUrl || "";
    this.upVector = upVector || new THREE.Vector3(0,1,0);

    this.userData.unselectable = true; // this should never be selectable
    this._drawPlane();
  }

  _drawPlane(){
    //create plane for shadow projection   
    var width = this.width;
    var length = this.length;
    var shadowColor = this.shadowColor;

    var planeGeometry = new THREE.PlaneBufferGeometry(-width, length, 1, 1);
    var texture = THREE.ImageUtils.loadTexture( this.imgUrl );
    var planeMaterial = new THREE.MeshLambertMaterial({ map : texture, side : THREE.DoubleSide });
    //create plane for image display    
    this.plane = new THREE.Mesh(planeGeometry, planeMaterial);
    this.plane.rotation.x = Math.PI;
    this.plane.position.z = -0.2;
    this.name = "shadowPlane";
    this.plane.receiveShadow = true;
    
    this.add(this.plane);
  }

  setUp(upVector) {
    this.upVector = upVector;
    this.up = upVector;
    this.lookAt(upVector);
  }
}

//export { ImagePlane };
module.exports = ImagePlane;
