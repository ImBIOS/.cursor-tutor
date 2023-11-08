// Example: Language translation

/*
Simply, copy the following python code, hit Cmd+K, ask it to translate some code to rust, paste in the code, and hit enter.
*/

use std::process;
use std::sync::mpsc::{channel, Sender};
use std::thread;
use std::time::{SystemTime, UNIX_EPOCH};

fn generate_random_number(tx: Sender<i32>) {
    // Simple pseudorandom number generator using system time
    let start = SystemTime::now();
    let since_the_epoch = start
        .duration_since(UNIX_EPOCH)
        .expect("Time went backwards");
    let in_ms =
        since_the_epoch.as_secs() * 1000 + since_the_epoch.subsec_nanos() as u64 / 1_000_000;
    let random_number = in_ms - in_ms / 1000 * 1000;

    // Ensure the number is different for different processes by adding the process id
    let random_number = random_number as i32 + process::id() as i32;

    tx.send(random_number).unwrap();
}

fn generate_n_random_numbers(n: i32) -> Vec<i32> {
    let mut handles = vec![];
    let (tx, rx) = channel();

    // Create n threads
    for _ in 0..n {
        let thread_tx = tx.clone();
        let handle = thread::spawn(move || {
            generate_random_number(thread_tx);
        });
        handles.push(handle);
    }

    // Wait for all threads to finish
    for handle in handles {
        handle.join().unwrap();
    }

    // Get results
    let mut random_numbers = vec![];
    for _ in 0..n {
        random_numbers.push(rx.recv().unwrap());
    }

    random_numbers
}

fn main() {
    let n = 10; // generate 10 different random numbers
    let random_numbers = generate_n_random_numbers(n);
    println!("{:?}", random_numbers);
}
