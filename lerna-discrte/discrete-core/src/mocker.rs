pub struct User {
    key: i32,
    name: String,
    age: i32,
    address: String,
}

impl User {
    fn new(key: i32, name: impl Into<String>, age: i32, address: impl Into<String>) -> Self {
        Self {
            key,
            name: name.into(),
            age,
            address: address.into(),
        }
    }
}

fn generate_for_array(arr: Vec<i32>) -> Vec<User> {
    let mut userList = vec![];
    for item in arr.iter() {
        let user = User::new(
            *item,
            format!("name {}", item),
            20 + item,
            format!("西湖公园{}号", item),
        );

        userList.push(user);
    }

    userList
}

pub fn get_set_a() -> Vec<i32> {
    let set_a = vec![0, 1, 3, 5, 7, 9];

    set_a
}

pub fn get_set_b() -> Vec<i32> {
    let b_set = vec![0, 2, 4, 6, 8, 10];
    b_set
}
