package javalesson02_variety;

import java.util.Scanner;

public class Q5 {
	public static void main(String[] args) {
		Scanner scanner = new Scanner(System.in);
		String name = scanner.nextLine();
		System.out.println("こんにちは, " + name + " さん！");
		scanner.close();
	}
}