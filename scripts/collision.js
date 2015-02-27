function collision(go1,go2){
	//return true;
	if(go1.getX()+go1.getWidth() >go2.getX()){
		if(go1.getX()<go2.getX()+go2.getWidth()){
			if(go1.getY()+go1.getHeight()>go2.getY()){
				if (go1.getY()<go2.getY()+go2.getHeight()){
					return true;
					console.log("coll true");
				}else return false;
			}else return false;
		}else return false;
	} else return false;
}