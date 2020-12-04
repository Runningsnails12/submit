package shaobing.domain;

public class Info {
	private int flag;
	private String message;
	public Info() {}
	public Info(int flag, String message) {
		super();
		this.flag = flag;
		this.message = message;
	}
	public int getFlag() {
		return flag;
	}
	public void setFlag(int flag) {
		this.flag = flag;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	};
	
}
